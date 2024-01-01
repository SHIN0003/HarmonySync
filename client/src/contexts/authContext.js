import React, { createContext } from 'react';
import axios from 'axios';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    function handleLogin() {
        window.location.href = 'http://localhost:3001/login';
    }

    async function handleLogout() {
        try {
            await axios.post('http://localhost:3001/logout');
            localStorage.clear();
            window.location.href = 'http://localhost:3000';
        } catch (error) {
            console.error('Error logging out:', error);
        }
    }

    async function fetchTokens() {
        try {
            const response = await axios.get('http://localhost:3001/api/token', { withCredentials: true });
            if (response.data.accessToken) {
                localStorage.setItem('accessToken', response.data.accessToken);
                return response.data.accessToken;
            }
        } catch (error) {
            console.error('Error fetching tokens:', error);
        }
    }

    async function fetchUser(accessToken) {
        if (accessToken) {
            try {
                const response = await axios.get('https://api.spotify.com/v1/me', {
                    headers: { 'Authorization': `Bearer ${accessToken}` }
                });
                return response.data;
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        }
    }

    return (
        <AuthContext.Provider value={{
            handleLogin,
            handleLogout,
            fetchTokens,
            fetchUser
        }}>
            {children}
        </AuthContext.Provider>
    );
};

