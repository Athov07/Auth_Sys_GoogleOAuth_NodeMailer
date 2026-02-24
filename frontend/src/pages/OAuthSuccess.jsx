import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Card from "../components/Card";

export default function OAuthSuccess() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get("token");

    if (token) {
      // Store access token
      localStorage.setItem("accessToken", token);

      // Redirect to profile page
      navigate("/profile");
    } else {
      // If no token found, go back to login
      navigate("/login");
    }
  }, [location, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md p-6 text-center">
        <h2 className="text-xl font-semibold mb-2">
          Signing you in...
        </h2>
        <p className="text-gray-500 text-sm">
          Please wait while we complete your Google login.
        </p>
      </Card>
    </div>
  );
}