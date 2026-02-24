import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import Card from "../components/Card";
import Input from "../components/Input";
import Button from "../components/Button";
import Alert from "../components/Alert";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setError("");
    setMessage("");

    if (!email) {
      return setError("Email is required");
    }

    try {
      const res = await API.post("/auth/forgot-password", { email });
      setMessage(res.data.message);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-md">
        <h1 className="heading text-center">Forgot Password</h1>

        {error && <Alert message={error} />}
        {message && <Alert message={message} type="success" />}

        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-4"
        />

        <Button onClick={handleSubmit} className="w-full">
          Send Reset Link / OTP
        </Button>
      </Card>
    </div>
  );
}