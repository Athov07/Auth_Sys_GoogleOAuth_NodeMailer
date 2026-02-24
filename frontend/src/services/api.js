import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api", // your backend base URL
});

// Attach access token automatically
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// API service functions
const authService = {
  // LOGIN
  login: async (email, password) => {
    return await API.post("/auth/login", { email, password });
  },

  // GOOGLE LOGIN → backend redirects directly

  // SEND OTP (for registration)
  sendOtp: async (email) => {
    return await API.post("/auth/send-otp", { email });
  },

  // RESEND OTP
  resendOtp: async (email) => {
    return await API.post("/auth/resend-otp", { email });
  },

  // REGISTER (with OTP)
  register: async (name, email, password, otp) => {
    return await API.post("/auth/register", { name, email, password, otp });
  },

  // FORGOT PASSWORD → sends OTP
  forgotPassword: async (email) => {
    return await API.post("/auth/forgot-password", { email });
  },

  // RESET PASSWORD
  resetPassword: async (email, password) => {
    return await API.post("/auth/reset-password", { email, password });
  },

  // GET PROFILE
  getProfile: async () => {
    return await API.get("/protected/profile");
  },

  // DASHBOARD → role-based data
  getDashboard: async () => {
    return await API.get("/protected/dashboard");
  },

  // LOGOUT
  logout: async () => {
    return await API.post("/auth/logout");
  },

  // GOOGLE LOGIN → backend redirect
  googleLogin: () => {
    window.location.href = "http://localhost:5000/api/auth/google";
  },

};

export default authService;