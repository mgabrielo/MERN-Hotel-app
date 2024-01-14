import express, { Response, Request } from "express";
import multer from "multer";
import cloudinary from "cloudinary";
import Hotel, { HotelType } from "../models/hotel";
import { verifyToken } from "../middleware/auth";
import { body } from "express-validator";

const router = express.Router();

const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5mb
  },
});

router.post(
  "/",
  verifyToken,
  upload.array("imageFiles", 6),
  [
    body("name").notEmpty().withMessage("Name is Required"),
    body("city").notEmpty().withMessage("city is Required"),
    body("country").notEmpty().withMessage("country is Required"),
    body("description").notEmpty().withMessage("description is Required"),
    body("type").notEmpty().withMessage("hotel type is Required"),
    body("pricePerNight")
      .notEmpty()
      .isNumeric()
      .withMessage("price Per Night is a Required Number"),
    body("facilities")
      .notEmpty()
      .isArray()
      .withMessage("facilities are Required"),
  ],
  async (req: Request, res: Response) => {
    try {
      const imageFiles = req.files as Express.Multer.File[];
      const newHotel: HotelType = req.body;
      const imageURLs = await uploadImages(imageFiles);
      newHotel.imageUrls = imageURLs;
      newHotel.lastUpdated = new Date();
      newHotel.userId = req?.userId;
      const hotel = new Hotel(newHotel);
      await hotel.save();
      res.status(201).json({ hotel: hotel });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "something went wrong" });
    }
  }
);

router.get("/", verifyToken, async (req: Request, res: Response) => {
  try {
    const userHotels = await Hotel.find({ userId: req?.userId });
    res.status(200).json({ userHotels: userHotels });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong" });
  }
});

router.get("/:id", verifyToken, async (req: Request, res: Response) => {
  const id = req.params.id.toString();
  try {
    const hotel = await Hotel.findOne({ _id: id, userId: req.userId });
    if (!hotel) {
      res.status(404).json({ message: "Hotel Not Found" });
    }
    return res.status(200).json({ hotel: hotel });
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
});

router.put(
  "/:hotelId",
  verifyToken,
  upload.array("imageFiles"),
  async (req: Request, res: Response) => {
    const id = req.params.hotelId;
    try {
      const updatedHotel: HotelType = req.body;
      const hotel = await Hotel.findOneAndUpdate(
        { _id: id, userId: req.userId },
        updatedHotel,
        { new: true }
      );
      if (!hotel) {
        res.status(404).json({ message: "Hotel Not Found" });
      }
      const files = req.files as Express.Multer.File[];
      const updatedImgUrls = await uploadImages(files);
      if (hotel) {
        hotel.imageUrls = [
          ...updatedImgUrls,
          ...(updatedHotel.imageUrls || []),
        ];
        await hotel.save();
        res.status(200).json({ hotel: hotel });
      }
    } catch (error) {
      res.status(500).json({ message: "something went wrong" });
    }
  }
);

async function uploadImages(imageFiles: Express.Multer.File[]) {
  const uploadPromise = imageFiles.map(async (image) => {
    const base64Img = Buffer.from(image.buffer).toString("base64");
    let data_uri = "data:" + image.mimetype + ";base64," + base64Img;
    const res = await cloudinary.v2.uploader.upload(data_uri);
    return res.url;
  });
  const imageURLs = await Promise.all(uploadPromise);
  return imageURLs;
}

export default router;
