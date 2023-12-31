import React, { useEffect, useContext } from 'react';
import { AuthContext } from '/Users/andrewtai/Desktop/codingfiles/Express/client/src/contexts/authContext.js';

const AuthCallback = () => {
    const { updateAccessToken, updateLoginStatus, fetchTokens } = useContext(AuthContext);

    useEffect(() => {
        const fetchAndSetTokens = async () => {
            const tokens = await fetchTokens();
            if (tokens) {
                updateAccessToken(tokens);
                updateLoginStatus(true);
                // Redirect to home or other page after successful login
            }
        };
        fetchAndSetTokens();
    }, []);

    return <div>Loading...</div>; // Or some loading indicator
};

export default AuthCallback;
