import express from "express";
import {
    sendMessage,
    getMessages
} from "../controllers/message-controller.js";
import { authMiddleware } from "../middlewares/authication-middleware.js";
const router = express.Router();


router.post("/send-message/:receiverId", authMiddleware, sendMessage);
router.get("/get-messages/:receiverId", authMiddleware, getMessages);



export default router;