import './App.css';
import './index.css';
import React, { useState, useEffect, useContext } from 'react';
import {AuthContext } from './contexts/authContext';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

import {BrowserRouter, createBrowserRouter, RouterProvider, Route, Routes} from "react-router-dom";

import Home from "./components/home.js";
import CustomNavbar from "./components/navbar.js";
import AuthCallback from "./components/authCallback.js";
import Playlists from "./components/playlists.js";
import Songs from "./components/songs.js";
import 'bootstrap/dist/css/bootstrap.min.css';


const App = () => {
  const [home, setHome] = React.useState("");

  const { 
    handleLogin, 
    handleLogout, 
    fetchTokens 
  } = useContext(AuthContext);
    const [playlists, setPlaylists] = useState([]);



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
                                            {
                                                path: "/playlists",
                                                element: <Playlists/>,
                                            }
                                            ,
                                            {
                                                path: "/songs/:playlistId",
                                                element: <Songs/>,
                                            }

                                       ]);
    return (
      <BrowserRouter>
        <CustomNavbar/>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Home />} />
          <Route path="/auth/callback" element={<AuthCallback />} />
          <Route path="/playlists" element={<Playlists />} />
          <Route path="/songs/:playlistId" element={<Songs />} />
          {/* Add more routes as needed */}
        </Routes>
      </BrowserRouter>
  );
}

export default App;