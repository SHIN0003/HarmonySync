import './App.css';
import './index.css';
import React, { useState, useEffect, useContext } from 'react';
import {AuthContext } from './contexts/authContext';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

import {BrowserRouter, createBrowserRouter, RouterProvider} from "react-router-dom";

import Home from "./components/Home/home.js";
import CustomNavbar from "./components/Navbar/navbar.js";
import AuthCallback from "./components/AuthCallback/authCallback.js";
import 'bootstrap/dist/css/bootstrap.min.css';


const App = () => {
  const [home, setHome] = React.useState("");

  const { 
    isLoggedIn, 
    accessToken, 
    updateLoginStatus, 
    updateAccessToken, 
    handleLogin, 
    handleLogout, 
    fetchTokens 
  } = useContext(AuthContext);
    const [playlists, setPlaylists] = useState([]);


  // Fetch user data when access token changes
  //NEXT STEP TMRW SET THIS UP IN A DIFFERENT FILE AND IMPORT IT SETTING UP USER


  // Checks URL for access token and sets it in state
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('loggedIn') === 'true') {
        // Call fetchTokens and then update the access token
        const fetchAndSetTokens = async () => {
            const tokens = await fetchTokens();
            updateAccessToken(tokens);
            updateLoginStatus(true);
        };
        fetchAndSetTokens();
    } else {
        updateLoginStatus(false);
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
 

    const router = createBrowserRouter([
                                           {
                                               path: "/home",
                                               element: <Home/>,
                                           },
                                           {
                                                path: "/",
                                                element: <Home/>,
                                            },
                                            {
                                                path: "/auth/callback",
                                                element: <AuthCallback />,
                                            },

                                       ]);
    return (
      <div>
        //update navbar to pass to pass in user
        <button onClick={handleLogout}>Logout</button>
        <CustomNavbar/>
        <RouterProvider router={router} />
      </div>
    );
}

export default App;