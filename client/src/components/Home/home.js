// import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

function Home({home, user, isLoggedIn, handleLogin, handleLogout}) {
  


  return (

    <div className="App">

        <header className="App-header">
            <p>
            Welcome to Spotify Playlist Generator!
            </p>
        </header>
    </div>

  
  );
}

export default Home;