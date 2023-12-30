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
import 'bootstrap/dist/css/bootstrap.min.css';


const App = () => {
  const context = useContext(AuthContext);
  const [home, setHome] = React.useState("");
  const [user, setUser] = React.useState(null);
  const { isLoggedIn, accessToken, updateLoginStatus, updateAccessToken, handleLogin, handleLogout, fetchTokens } = useContext(AuthContext);
  const [playlists, setPlaylists] = useState([]);


  // Fetch user data when access token changes
  //NEXT STEP TMRW SET THIS UP IN A DIFFERENT FILE AND IMPORT IT SETTING UP USER
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
 
  //handles login and redirects to spotify login page

  // async function fetchUserPlaylists() {
  //   if (isLoggedIn && accessToken) {
  //     try {
  //       const response = await axios.get('https://api.spotify.com/v1/me/playlists', {
  //         headers: {
  //           'Authorization': `Bearer ${accessToken}`
  //         }
  //       });
  //       setPlaylists(response.data.items); // Assuming the playlists are in the 'items' array
  //     } catch (error) {
  //       console.error('Error fetching playlists:', error);
  //     }
  //   }
  // }



    const router = createBrowserRouter([
                                           {
                                               path: "/home",
                                               element: <Home/>,
                                           },
                                           {
                                                path: "/",
                                                element: <Home/>,
                                            },

                                       ]);
    return (
      <div>
        //update navbar to pass to pass in user
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