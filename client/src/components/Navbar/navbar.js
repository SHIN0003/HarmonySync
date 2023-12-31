import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../contexts/authContext.js';
import { Navbar, Container } from "react-bootstrap";

function CustomNavbar() {
    const { handleLogin, handleLogout } = useContext(AuthContext);
    const [user, setUser] = useState(null);

    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const accessToken = localStorage.getItem('accessToken');

    useEffect(() => {
        if (isLoggedIn && accessToken) {
            async function fetchUser() {
                try {
                    const response = await axios.get('https://api.spotify.com/v1/me', {
                        headers: { 'Authorization': `Bearer ${accessToken}` }
                    });
                    setUser(response.data);
                } catch (error) {
                    console.error('Error fetching user data:', error);
                }
            }
            fetchUser();
        }
    }, [accessToken]);

    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="/home">Spotify Playlist Generator</Navbar.Brand>
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text>
                        {isLoggedIn && user ? (
                            <div className="user-info">
                                <img src={user.images[0]?.url} alt="User" className="user-image" />
                                <p className="user-name">{user.display_name}</p>
                                <button onClick={handleLogout}>Logout</button>
                            </div>
                        ) : (
                            <button onClick={handleLogin}>Login</button>
                        )}
                    </Navbar.Text>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default CustomNavbar;
