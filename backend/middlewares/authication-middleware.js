import jwt from "jsonwebtoken";
import { Auth } from "../models/auth-model.js";
import dotenv from "dotenv";

dotenv.config();

export const authMiddleware = async (req, res, next) => {
  const token = req.cookies?.token || req.header("authrization");

  if (!token) {
    return res
      .status(200)
      .json({ message: "Please login to access this resource" });
  }

  try {
    const verifyToken = jwt.verify(token, process.env.JWT_SECRET);

    const user = await Auth.findById(verifyToken.userId);

    if (!user) {
      return res.status(200).json({ message: "User not found" });
    }

    req.id = user._id;

    next();
  } catch (error) {
    return res
      .status(200)
      .json({ message: "Invalid token", error: error.message });
  }
};
