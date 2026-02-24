import express from "express";
import passport from "passport";
import { generateTokens } from "../utils/generateTokens.js";
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

// Initiate Google OAuth login
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Google callback route
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login-failed", session: false }),
  async (req, res) => {
    const { accessToken, refreshToken } = generateTokens(req.user);
    req.user.refreshToken = refreshToken;
    await req.user.save();

    res.json({
      success: true,
      accessToken,
      refreshToken,
    });
  }
);

export default router;   // ✅ MUST BE DEFAULT EXPORT