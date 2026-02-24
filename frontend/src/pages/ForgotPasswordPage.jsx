import React, { useState } from "react";
import API from "../services/api";
import Card from "../components/Card";
import Input from "../components/Input";
import Button from "../components/Button";
import Alert from "../components/Alert";
import OTPVerificationPage from "./OTPVerificationPage";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [message, setMessage] = useState("");

  const handleSendOtp = async () => {
    try {
      await API.post("/auth/forgot-password", { email });
      setOtpSent(true);
      setMessage("OTP sent to your email for password reset.");
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to send OTP");
    }
  };

  return (
    <div className="page-container flex items-center justify-center min-h-screen bg-bg">
      {!otpSent ? (
        <Card className="w-full max-w-md">
          <h1 className="heading text-center">Forgot Password</h1>
          {message && <Alert type="error" message={message} />}
          <Input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} className="mb-4"/>
          <Button onClick={handleSendOtp} className="w-full">Send OTP</Button>
        </Card>
      ) : (
        <OTPVerificationPage
          email={email}
          onVerified={() => setMessage("OTP verified, now reset your password")}
        />
      )}
      {otpSent && message.includes("verified") && (
        <Button
          onClick={() => window.location.href = `/reset-password?email=${email}`}
          className="mt-4 w-full"
        >
          Reset Password
        </Button>
      )}
    </div>
  );
}