import {Button, Col, Row} from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../contexts/authContext.js';

function CustomNavbar() {
    const { 
        isLoggedIn, 
        accessToken, 
        updateLoginStatus, 
        updateAccessToken, 
        handleLogin, 
        handleLogout, 
        fetchTokens 
      } = useContext(AuthContext);
    const [user, setUser] = React.useState(null);
      useEffect(() => {
        // Using Axios for GET request
        if (isLoggedIn && accessToken) {
          async function getUser() {
            try {
              const spotifyResponse = await axios.get('https://api.spotify.com/v1/me', {
                headers: { 'Authorization': `Bearer ${accessToken}` }
              });
              setUser(spotifyResponse.data); // Axios automatically handles the response as JSON
              
            } catch (error) {
              console.error('Error fetching user data:', error);
            }
          }
          getUser();
        }
      }, [accessToken, isLoggedIn]);
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