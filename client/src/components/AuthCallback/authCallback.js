import React, { useEffect, useContext } from 'react';
import { AuthContext } from '/Users/andrewtai/Desktop/codingfiles/Express/client/src/contexts/authContext.js';

const AuthCallback = () => {
    const { fetchTokens } = useContext(AuthContext);

    useEffect(() => {
        const fetchAndSetTokens = async () => {
            const tokens = await fetchTokens();
            if (tokens) {
                localStorage.setItem('accessToken', tokens);
                localStorage.setItem('isLoggedIn', true);
                // Redirect to home or other page after successful login
            }
        };
        fetchAndSetTokens();
    }, [fetchTokens]);

    return <div>Loading...</div>; // Or some loading indicator
};

export default AuthCallback;
