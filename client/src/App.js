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
import Bpmcreate from "./components/bpmCreate.js";
import GeneratePlaylist from "./components/generatePlaylist.js";
import SavePlaylist from './components/savePlaylist.js';

import 'bootstrap/dist/css/bootstrap.min.css';


const App = () => {



    return (
      <BrowserRouter>
        <CustomNavbar/>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Home />} />
          <Route path="/auth/callback" element={<AuthCallback />} />
          <Route path="/playlists" element={<Playlists />} />
          <Route path="/songs/:playlistId" element={<Songs />} />
          <Route path="/bpmcreate/:trackId" element={<Bpmcreate/>} />
          <Route path="/generateplaylist/:bpm/:energy/:trackId" element={<GeneratePlaylist/>} />
          <Route path="/saveplaylist" element={<SavePlaylist/>} />
          {/* Add more routes as needed */}
        </Routes>
      </BrowserRouter>
  );
}

export default App;