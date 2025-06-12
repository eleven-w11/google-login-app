import React, { useState } from 'react';
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

const GooGle = () => {
    const [user, setUser] = useState(null);

    const handleLoginSuccess = (credentialResponse) => {
        console.log('Credential Response:', credentialResponse);   // ➕ console log
        const decoded = jwtDecode(credentialResponse.credential);
        setUser(decoded);
    };

    const handleLoginError = () => {
        console.log('Login failed');
    };

    const handleLogout = () => {
        googleLogout();
        setUser(null);
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '4rem' }}>
            <h2>Google Sign‑In Test Page</h2>

            {user ? (
                <>
                    <img src={user.picture} alt="profile" style={{ width: 80, borderRadius: '50%' }} />
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
