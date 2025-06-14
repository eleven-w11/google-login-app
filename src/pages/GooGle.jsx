import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';

const GooGle = () => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    //     try {
    //         const res = await axios.post('http://localhost:5000/api/auth/google', {
    //             tokenId: credentialResponse.credential
    //         }, {
    //             withCredentials: true, // This is crucial
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'Accept': 'application/json'
    //             }
    //         });

    //         if (res.data.success) {
    //             setUser(res.data.user);
    //             navigate("/UserProfile");
    //         }
    //     } catch (error) {
    //         console.error("Complete error:", {
    //             message: error.message,
    //             response: error.response?.data,
    //             config: error.config
    //         });
    //         alert("Login failed. Please check console for details.");
    //     }
    // };
    const handleLoginSuccess = async (credentialResponse) => {
        try {
            const res = await axios.post(
                'http://localhost:5000/api/auth/google',
                { tokenId: credentialResponse.credential },
                {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                }
            );

            if (res.data.success) {
                localStorage.setItem('user', JSON.stringify(res.data.user));
                navigate('/UserProfile');
            }
        } catch (error) {
            console.error('Login Error:', {
                message: error.message,
                response: error.response?.data,
                config: error.config
            });
            alert('Login failed. Check console for details.');
        }
    };

    const handleLoginError = () => {
        setError("Google login failed. Please try again.");
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '4rem' }}>
            <h2>Google Sign‑In Test Page</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}

            {user ? (
                <div>
                    <p>Already logged in as {user.name}</p>
                    <button onClick={() => navigate("/UserProfile")}>
                        Go to Profile
                    </button>
                </div>
            ) : (
                <div>
                    <h3>Google Login</h3>
                    <GoogleLogin
                        onSuccess={handleLoginSuccess}
                        onError={handleLoginError}
                        theme="outline"
                        size="large"
                        shape="rectangular"
                    />
                </div>
            )}
        </div>
    );
};

export default GooGle;