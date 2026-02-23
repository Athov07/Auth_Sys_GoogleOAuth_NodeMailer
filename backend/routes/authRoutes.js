import express from "express";
import {
  sendOtp,
  resendOtp,
  register,
  login,
  refreshToken,
  forgotPassword,
  resetPassword,
  logout,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/send-otp", sendOtp);
router.post("/resend-otp", resendOtp);
router.post("/register", register);
router.post("/login", login);
router.post("/refresh-token", refreshToken);
router.post("/logout", logout);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

export default router;   // ✅ MUST BE DEFAULT EXPORT