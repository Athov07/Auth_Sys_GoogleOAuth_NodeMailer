import React, { useEffect, useState, useContext } from "react";
import API from "../services/api";
import { AuthContext } from "../context/AuthContext";
import Card from "../components/Card";

export default function ProfilePage() {
  const { user } = useContext(AuthContext);
  const [profile, setProfile] = useState(user || null);

  useEffect(() => {
    if (!user) {
      const fetchProfile = async () => {
        try {
          const res = await API.get("/protected/profile");
          setProfile(res.data.user || res.data);
        } catch (err) {
          console.error(err.response?.data?.message || "Failed to fetch profile");
        }
      };
      fetchProfile();
    }
  }, [user]);

  if (!profile) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="page-container">
      <Card>
        <h1 className="heading">Profile</h1>
        <p><strong>Name:</strong> {profile.name}</p>
        <p><strong>Email:</strong> {profile.email}</p>
        <p><strong>Role:</strong> {profile.role || "User"}</p>
      </Card>
    </div>
  );
}