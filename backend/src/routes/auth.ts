import express, { Request, Response } from "express";
import User from "../models/user";
import jwt from "jsonwebtoken";
import { check, validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import { verifyToken } from "../middleware/auth";

const router = express.Router();

router.post(
  "/login",
  [
    check("email", "Email is Required").isEmail(),
    check("password", "Password with six or more Characters Required").isLength(
      { min: 6 }
    ),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array() });
    }
    const { email, password } = req.body;
    try {
      const existingUser = await User.findOne({ email: email });
      if (!existingUser) {
        return res.status(400).json({ message: "Invalid Credential" });
      }
      const isPasswordMatch = await bcrypt.compare(
        password,
        existingUser.password
      );
      if (!isPasswordMatch) {
        return res.status(400).json({ message: "Invalid Credential" });
      }
      const token = jwt.sign(
        { userId: existingUser._id },
        process.env.JWT_SECRET as string,
        { expiresIn: "1d" }
      );
      res.cookie("auth_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 86400000,
      });
      res.status(200).json({ userId: existingUser._id });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "something went wrong" });
    }
  }
);

router.get("/validate-token", verifyToken, (req: Request, res: Response) => {
  res.status(200).send({ userId: req.userId });
});

router.get("/logout", (req: Request, res: Response) => {
  res.clearCookie("auth_token");
  res.send();
});

export default router;
