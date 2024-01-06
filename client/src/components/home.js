// import './App.css';
import React, { useState, useEffect, useContext} from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { AuthContext } from '../contexts/authContext';
import { Link } from 'react-router-dom';

function Home() {
  const { user, handleLogin, handleLogout } = useContext(AuthContext);
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const accessToken = localStorage.getItem('accessToken');

  return (
    <div className="App">
      <header className="App-header">
        <p>Welcome to Spotify Playlist Generator!</p>
        {isLoggedIn && accessToken ? (
          <Link to="/playlists" className="btn btn-primary">View Playlists</Link>
        ) : null}
      </header>
    </div>
  );
}

export default Home;