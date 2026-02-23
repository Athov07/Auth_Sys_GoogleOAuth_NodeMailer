import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import "./utils/sendEmail.js";
import nodemailer from "nodemailer";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import { errorHandler } from "./middleware/errorMiddleware.js";
import rateLimiter from "./middleware/rateLimiter.js";

const app = express();

// Core middlewares
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(morgan("dev"));
app.use(rateLimiter);

// Routes
app.use("/api/auth", authRoutes);

// Global error handler (must be last)
app.use(errorHandler);

// Start server after DB connects
const startServer = async () => {
  try {
    await connectDB();
    app.listen(process.env.PORT || 5000, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  } catch (error) {
    console.error("Server failed to start");
    process.exit(1);
  }
};

startServer();