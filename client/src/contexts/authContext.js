import React, { createContext } from 'react';
import axios from 'axios';

export const AuthContext = createContext(null);


export const AuthProvider = ({ children }) => {

    function handleLogin() {
        console.log(process.env.REACT_APP_URL)
        window.location.href = `${process.env.REACT_APP_URL}/login`;
    }

    async function handleLogout() {
        try {
            await axios.post(`${process.env.REACT_APP_URL}/logout`);
            localStorage.clear();
            window.location.href =  `${process.env.REACT_APP_URL}`;
        } catch (error) {
            console.error('Error logging out:', error);
        }
    }

    async function fetchTokens() {
        try {
            const response = await axios.get(`${process.env.REACT_APP_URL}/api/token`, { withCredentials: true });
            if (response.data.accessToken) {
                localStorage.setItem('accessToken', response.data.accessToken);
                return response.data.accessToken;
            }
        } catch (error) {
            console.error('Error fetching tokens:', error);
        }
    }

    async function fetchUser(accessToken) {
        if (accessToken) {
            try {
                const response = await axios.get('https://api.spotify.com/v1/me', {
                    headers: { 'Authorization': `Bearer ${accessToken}` }
                });
                return response.data;
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        }
    }

    async function fetchPlaylists(accessToken) {
        if (accessToken) {
            try {
                const response = await axios.get('https://api.spotify.com/v1/me/playlists?limit=50', {
                    headers: { 'Authorization': `Bearer ${accessToken}` }
                });
                return response.data;
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        }
    }
    
    async function handleBPM(trackId, accessToken) {
        try {
            const audioFeaturesUrl = `https://api.spotify.com/v1/audio-features/${trackId}`;
            const response = await axios.get(audioFeaturesUrl, {
                headers: { 'Authorization': `Bearer ${accessToken}` }
            });
            const tempo = response.data.tempo;
            return tempo;
        } catch (error) {
            console.error('Error fetching audio features:', error);
        }
    }

    async function fetchEnergy(trackId, accessToken) {
        try {
            const audioFeaturesUrl = `https://api.spotify.com/v1/audio-features/${trackId}`;
            const response = await axios.get(audioFeaturesUrl, {
                headers: { 'Authorization': `Bearer ${accessToken}` }
            });
            const energy = response.data.energy;
            return energy;
        }
        catch (error) {
            console.error('Error fetching audio features:', error);
        }
    }

    async function fetchTrackGenre(trackId, accessToken) {
        try {
            // First, fetch the track information to get the artist's ID
            const trackUrl = `https://api.spotify.com/v1/tracks/${trackId}`;
            const trackResponse = await axios.get(trackUrl, {
                headers: { 'Authorization': `Bearer ${accessToken}` }
            });
            const artistId = trackResponse.data.artists[0].id; // Assuming you want the first artist
            
            // Next, fetch the artist information using the artist's ID
            const artistUrl = `https://api.spotify.com/v1/artists/${artistId}`;
            const artistResponse = await axios.get(artistUrl, {
                headers: { 'Authorization': `Bearer ${accessToken}` }
            });

            const genres = artistResponse.data.genres; // This is an array of genres
    
            // Return the genres array, or however you'd like to handle it
            return genres;
        } catch (error) {
            console.error('Error fetching genre:', error);
            throw error; // Re-throw the error to handle it further up the call stack
        }
    }
    

    return (
        <AuthContext.Provider value={{
            handleLogin,
            handleLogout,
            fetchTokens,
            fetchUser,
            fetchPlaylists,
            handleBPM,
            fetchEnergy,
            fetchTrackGenre
        }}>
            {children}
        </AuthContext.Provider>
    );
};

