import {Button, Col, Row} from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import React from 'react';
import axios from 'axios';

function CustomNavbar({home, user, isLoggedIn, handleLogin, handleLogout}) {
    console.log("user", user)
    return (
    <Navbar bg="dark" variant="dark">
        <Container>
        <Navbar.Brand href="home">Spotify Playlist Generator</Navbar.Brand>
        <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
            {isLoggedIn && user && (
                <div className="user-info">
                <img src={user.images[0].url} alt="User" className="user-image" />
                <p className="user-name">{user.display_name}</p>
                <button onClick={handleLogout}>Logout</button>
                </div>
            )}
            {!isLoggedIn && (
                <button onClick={handleLogin}>Login</button>
            )}
            </Navbar.Text>
        </Navbar.Collapse>
        </Container>
    </Navbar>
    );
}

export default CustomNavbar;