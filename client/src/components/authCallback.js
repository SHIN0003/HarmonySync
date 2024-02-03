import React, { useEffect } from 'react';

const AuthCallback = () => {
    useEffect(() => {
        console.log("AuthCallback reached, parsing tokens...");

        // Alternatively, if the token is in the URL fragment:
        const hashParams = new URLSearchParams(window.location.hash.substring(1));
        const accessToken = hashParams.get('access_token');

        if (accessToken) {
            console.log("Tokens received, setting to local storage and redirecting...");
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('isLoggedIn', true);
            // Redirect to home or other page after successful login
            window.location.href = `${process.env.REACT_APP_FRONT}/home` || "localhost:3000/home";
        } else {
            console.log("No tokens received, handling error...");
            // Handle error, could redirect to a login page or show an error message
            window.location.href = `${process.env.REACT_APP_FRONT}/login` || "localhost:3000/login";
        }
    }, []);

    return <div>Loading...</div>; // Or some loading indicator
};

export default AuthCallback;
