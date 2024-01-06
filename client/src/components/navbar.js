import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../contexts/authContext.js';
import { Navbar, Container } from "react-bootstrap";
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png'; // Adjust the path if navbar.js is not in src


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
        <Navbar style={{ backgroundColor: '#301934' }} variant="dark" sticky="top">
            <Container>
                <Navbar.Brand>
                    <img 
                        src= {logo} // Replace with your logo path
                        alt="Logo"
                        style={{ marginRight: '20px', width: '75px', height: 'auto' }}
                    />
                    <Link to="/home" style={{textDecoration: 'none', color: 'inherit' }}>
                        HarmonySync
                    </Link>
                </Navbar.Brand>
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text>
                        {isLoggedIn && user ? (
                            <div className="user-info">
                                <img src={user.images[0]?.url ?? 'client/src/assets/dog.png'} alt="User" className="user-image" />
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
