import React, { useState, useContext } from "react";
import API from "../services/api";
import { AuthContext } from "../context/AuthContext";
import Card from "../components/Card";
import Input from "../components/Input";
import Button from "../components/Button";
import Alert from "../components/Alert";

export default function LoginPage() {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const res = await API.post("/auth/login", { email, password });
      login(res.data.user, res.data.accessToken);
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="page-container flex items-center justify-center min-h-screen bg-bg">
      <Card className="w-full max-w-md">
        <h1 className="heading text-center">Login</h1>
        {error && <Alert message={error} />}
        <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="mb-4" />
        <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="mb-4" />
        <Button onClick={handleLogin} className="w-full">Login</Button>

        {/* Google OAuth */}
        <a
          href="http://localhost:5000/api/auth/google"
          className="btn-secondary w-full mt-4 block text-center"
        >
          Login with Google
        </a>
      </Card>
    </div>
  );
}