import rateLimit from "express-rate-limit";

const rateLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 5, // limit each IP to 5 requests per minute
  message: {
    success: false,
    message: "Too many requests. Try again later.",
  },
});

export default rateLimiter;