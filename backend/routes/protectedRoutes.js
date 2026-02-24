import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

// Any authenticated user
router.get("/profile", protect, (req, res) => {
  res.json({
    success: true,
    user: {
      name: req.user.name,
      email: req.user.email,
      role: req.user.role,
    },
    cached: false, // if using node-cache
  });
});

// Only admin
router.get(
  "/admin-dashboard",
  protect,
  authorizeRoles("admin"),
  (req, res) => {
    res.json({
      success: true,
      message: "Welcome to Admin Dashboard",
    });
  }
);

export default router;