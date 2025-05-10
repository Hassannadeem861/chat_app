import express from "express";
import {
  register,
  login,
  getAllUsers,
  logout,
//   getSingleAdmin,
//   updatePassword,
//   forgetPassword,
//   resetPassword
} from "../controllers/auth-controller.js";
// import { authMiddleware, adminMiddleWare } from "../middleware/auth-middleware.js";
const router = express.Router();


router.post("/register", register);
router.post("/login", login);
router.get("/get-all-users", getAllUsers);
router.get("/logout", logout);
// router.get("/get-single-admin/:id", authMiddleware, getSingleAdmin);
// router.post("/forget-password", forgetPassword);
// router.post("/reset-password/:token", resetPassword);
// router.put("/update-password/:id", authMiddleware, updatePassword);


export default router;