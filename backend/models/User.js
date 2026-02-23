import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      index: true,
    },

    password: {
      type: String,
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    googleId: {
      type: String,
    },

    role: {
      type: String,
      enum: ["user", "admin", "moderator"],
      default: "user",
    },

    refreshToken: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// Optional: Add index for faster role queries
userSchema.index({ role: 1 });

export default mongoose.model("User", userSchema);