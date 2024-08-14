import express from "express";
import { signup, login, resetPassword } from "../controllers/authController"; // Adjust path as necessary

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/reset-password", resetPassword);

export default router;
