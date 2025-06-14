import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/auth/me", {
                    withCredentials: true,
                });

                if (!res.data?.success) {
                    throw new Error(res.data?.message || "Authentication failed");
                }

                setUser(res.data.user);
            } catch (err) {
                console.error("Profile fetch error:", {
                    message: err.message,
                    response: err.response?.data
                });

                if (err.response?.status === 401) {
                    // Token expired or invalid
                    setError("Session expired. Please login again.");
                } else {
                    setError("Failed to load profile. Please try again.");
                }

                navigate("/GooGle");
            }
        };

        fetchUser();
    }, [navigate]);

    const handleLogout = async () => {
        setLoading(true);
        try {
            await axios.post("http://localhost:5000/api/auth/logout", {}, {
                withCredentials: true
            });

            // Clear user state and redirect
            setUser(null);
            navigate("/GooGle");
        } catch (err) {
            console.error("Logout failed:", err);
            setError("Logout failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    if (error) return <p style={{ color: "red" }}>{error}</p>;
    if (!user) return <p>Loading user info...</p>;

    return (
        <div style={{
            textAlign: "center",
            marginTop: "4rem",
            maxWidth: "500px",
            margin: "4rem auto",
            padding: "2rem",
            boxShadow: "0 0 10px rgba(0,0,0,0.1)",
            borderRadius: "8px"
        }}>
            <h2>User Profile</h2>
            <img
                src={user.image}
                alt="profile"
                style={{
                    width: 100,
                    height: 100,
                    borderRadius: "50%",
                    objectFit: "cover",
                    margin: "1rem 0"
                }}
            />
            <div style={{ margin: "1rem 0" }}>
                <p><strong>Name:</strong> {user.name}</p>
                <p><strong>Email:</strong> {user.email}</p>
            </div>
            <button
                onClick={handleLogout}
                disabled={loading}
                style={{
                    padding: "0.5rem 1rem",
                    backgroundColor: "#ff4444",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                    fontSize: "1rem",
                    marginTop: "1rem",
                    opacity: loading ? 0.7 : 1
                }}
            >
                {loading ? "Logging out..." : "Logout"}
            </button>
        </div>
    );
};

export default UserProfile;