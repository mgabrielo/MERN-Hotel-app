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
      const uploadPromise = imageFiles.map(async (image) => {
        const base64Img = Buffer.from(image.buffer).toString("base64");
        let data_uri = "data:" + image.mimetype + ";base64," + base64Img;
        const res = await cloudinary.v2.uploader.upload(data_uri);
        return res.url;
      });
      const imageURLs = await Promise.all(uploadPromise);
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

export default router;
