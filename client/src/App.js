import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./components/home.js";
import CustomNavbar from "./components/navbar.js";
import AuthCallback from "./components/authCallback.js";
import Playlists from "./components/playlists.js";
import Songs from "./components/songs.js";
import Bpmcreate from "./components/bpmCreate.js";
import GeneratePlaylist from "./components/generatePlaylist.js";
import SavePlaylist from './components/savePlaylist.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import './index.css';

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
          <Route path="/saveplaylist/:bpm/:energy" element={<SavePlaylist/>} />
          {/* Add more routes as needed */}
        </Routes>
      </BrowserRouter>
  );
}

export default App;