import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../contexts/authContext.js';
import { Navbar, Container } from "react-bootstrap";
import { Link } from 'react-router-dom';
import logo from '../assets/spotify-icons-logos/icons/01_RGB/02_PNG/Spotify_Icon_RGB_White.png'

function CustomNavbar() {
    const { handleLogin, handleLogout,fetchUser } = useContext(AuthContext);
    const [user, setUser] = useState(null);

    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const accessToken = localStorage.getItem('accessToken');

    useEffect(() => {
        if (isLoggedIn && accessToken) {          
            fetchUser(accessToken).then((user) => setUser(user));
        }
    }, [accessToken]);

    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand>
                    <Link to="/home" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <img src= {logo} alt = "logo.png" width={30} height={30}/>
                        ‎ ‎ Spotify Playlist Generator
                    </Link>
                </Navbar.Brand>
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
