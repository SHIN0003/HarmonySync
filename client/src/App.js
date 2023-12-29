import './App.css';
import './index.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

import {BrowserRouter, createBrowserRouter, RouterProvider} from "react-router-dom";

import Home from "./components/Home/home.js";
import CustomNavbar from "./components/Navbar/navbar.js";
import 'bootstrap/dist/css/bootstrap.min.css';


const App = () => {
  const [home, setHome] = React.useState("");
  const [user, setUser] = React.useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [accessToken, setAccessToken] = useState(null);
  const [playlists, setPlaylists] = useState([]);

  async function fetchTokens() {
    try {
      const response = await axios.get('http://localhost:3001/api/token', { withCredentials: true });
      const accessToken = response.data.accessToken;
      // Store the access token in the state or context for further use
      // ...
      return accessToken;
    } catch (error) {
      console.error('Error fetching tokens:', error);
    }
  }

  // Fetch user data when access token changes
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

  // Checks URL for access token and sets it in state
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('loggedIn') === 'true') {
      setIsLoggedIn(true);
      // Define the async function
      const fetchAndSetTokens = async () => {
        const tokens = await fetchTokens();
        setAccessToken(tokens);
      };
      // Call the async function
      fetchAndSetTokens();
      // Optionally, clear the query params from the URL
    } else {
      setIsLoggedIn(false);
    }
  }, []);
  
  //home page data
  useEffect(() => {
    // Using Axios for GET request
    async function getHome() {
      try {
        const response = await axios.get('http://localhost:3001/home');
        setHome(response.data); // Axios automatically handles the response as JSON
      } catch (error) {
        console.error('Error fetching home data:', error);
      }
    }
    getHome();
  }, []);

  useEffect(() => {
    fetchUserPlaylists();
  }, [accessToken, isLoggedIn]);

  //handles login and redirects to spotify login page
  function handleLogin() {
    window.location.href = 'http://localhost:3001/login';
  }

  
  async function handleLogout() {
    try {
      await axios.post('http://localhost:3001/logout').then(res => {
        setIsLoggedIn(false);
        setAccessToken(null);
        console.log(res)
      });
    } catch (error) {
      console.error('Error logging out:', error);
    }
  }

  async function fetchUserPlaylists() {
    if (isLoggedIn && accessToken) {
      try {
        const response = await axios.get('https://api.spotify.com/v1/me/playlists', {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        });
        setPlaylists(response.data.items); // Assuming the playlists are in the 'items' array
      } catch (error) {
        console.error('Error fetching playlists:', error);
      }
    }
  }




    const router = createBrowserRouter([
                                           {
                                               path: "/home",
                                               element: <Home
                                               home={home}
                                                user={user}
                                                isLoggedIn={isLoggedIn}
                                                handleLogin={handleLogin}
                                                handleLogout={handleLogout}/>,
                                           },
                                           {
                                               path: "/",
                                               element: <Home
                                               home={home}
                                                user={user}
                                                isLoggedIn={isLoggedIn}
                                                handleLogin={handleLogin}
                                                handleLogout={handleLogout}/>,
                                           },

                                       ]);
    return (
      <div>
        <CustomNavbar
          home={home}
          user={user}
          isLoggedIn={isLoggedIn}
          handleLogin={handleLogin}
          handleLogout={handleLogout}
        />
        <RouterProvider router={router} />
      </div>
    );
}

export default App;