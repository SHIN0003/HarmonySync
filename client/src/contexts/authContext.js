import React, { createContext, useState } from 'react';
import axios from 'axios';
import AuthCallback from '../components/AuthCallback/authCallback';
export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');
    const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken'));

    const updateLoginStatus = (loggedIn) => {
        setIsLoggedIn(loggedIn);
        localStorage.setItem('isLoggedIn', loggedIn);
    };

    const updateAccessToken = (token) => {
        setAccessToken(token);
        localStorage.setItem('accessToken', token);
    };

    function handleLogin() {
        window.location.href = 'http://localhost:3001/login';
    }

    async function handleLogout() {
        try {
            await axios.post('http://localhost:3001/logout').then(res => {
                updateLoginStatus(false);
                updateAccessToken(null);
                localStorage.clear();
                console.log(res);
            });
        } catch (error) {
            console.error('Error logging out:', error);
        }
    }

    async function fetchTokens() {
        try {
          const response = await axios.get('http://localhost:3001/api/token', { withCredentials: true });
          const accessToken = response.data.accessToken;
          return accessToken;
        } catch (error) {
          console.error('Error fetching tokens:', error);
        }
      }

    return (
        <AuthContext.Provider value={{
            isLoggedIn,
            accessToken,
            updateLoginStatus,
            updateAccessToken,
            handleLogin,
            handleLogout,
            fetchTokens
        }}>
            {children}
        </AuthContext.Provider>
    );
};
