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
  passport.authenticate("google", { session: false }),
  async (req, res) => {
    const user = req.user;

    // 🔥 Always generate token
    const { accessToken } = generateTokens(user);

    res.redirect(
      `http://localhost:5173/oauth-success?token=${accessToken}`
    );
  }
);

export default router;   // MUST BE DEFAULT EXPORT