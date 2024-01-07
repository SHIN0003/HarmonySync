import React, { useEffect, useContext } from 'react';
import { AuthContext } from '../contexts/authContext';

const AuthCallback = () => {
    const { fetchTokens } = useContext(AuthContext);
    useEffect(() => {
        const fetchAndSetTokens = async () => {
            console.log("AuthCallback reached and fetching tokens...")
            const tokens = await fetchTokens();
            if (tokens) {
                localStorage.setItem('accessToken', tokens);
                localStorage.setItem('isLoggedIn', true);
                // Redirect to home or other page after successful login
                window.location.href = `${process.env.REACT_APP_FRONT}/home` || "localhost:3000/home";
            }
        };
        fetchAndSetTokens();
    }, [fetchTokens]);

    return <div>Loading...</div>; // Or some loading indicator
};

export default AuthCallback;
