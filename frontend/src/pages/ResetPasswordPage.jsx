import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import API from "../services/api";
import Card from "../components/Card";
import Input from "../components/Input";
import Button from "../components/Button";
import Alert from "../components/Alert";

export default function ResetPasswordPage() {
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email"); // from query param
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleResetPassword = async () => {
    if (password !== confirmPassword) {
      setMessage("Passwords do not match!");
      return;
    }
    try {
      await API.post("/auth/reset-password", { email, password });
      setMessage("Password reset successfully! You can login now.");
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to reset password");
    }
  };

  return (
    <div className="page-container flex items-center justify-center min-h-screen bg-bg">
      <Card className="w-full max-w-md">
        <h1 className="heading text-center">Reset Password</h1>
        {message && <Alert type="success" message={message} />}
        <Input type="password" placeholder="New Password" value={password} onChange={(e) => setPassword(e.target.value)} className="mb-4"/>
        <Input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="mb-4"/>
        <Button onClick={handleResetPassword} className="w-full">Reset Password</Button>
      </Card>
    </div>
  );
}