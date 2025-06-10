// X:\react-Web\google-login-app\src\pages\GooGle.jsx
import React, { useState } from "react";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import { jwtDecode } from 'jwt-decode';

const GooGle = () => {
    const [user, setUser] = useState(null);   // Google ka data yahan rakhenge

    const handleLoginSuccess = (credentialResponse) => {
        const decoded = jwtDecode(credentialResponse.credential);
        setUser(decoded);                      
    };

    const handleLoginError = () => {
        console.log("Login failed");
    };

    const handleLogout = () => {
        googleLogout();        // Google session khatam
        setUser(null);         // local state clear
    };

    return (
        <div style={{ textAlign: "center", marginTop: "4rem" }}>
            <h2>Google Sign‑In Test Page</h2>

            {user ? (
                <>
                    <img
                        src={user.picture}
                        alt="profile"
                        style={{ width: 80, borderRadius: "50%" }}
                    />
                    <p>{user.name}</p>
                    <p>{user.email}</p>
                    <button onClick={handleLogout}>Logout</button>
                </>
            ) : (
                <GoogleLogin onSuccess={handleLoginSuccess} onError={handleLoginError} />
            )}
        </div>
    );
};

export default GooGle;
