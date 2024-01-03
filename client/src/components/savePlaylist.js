import axios from 'axios';
import { useState, useContext } from 'react';
import { AuthContext } from '../contexts/authContext.js';

function SavePlaylist() {
    const { accessToken } = useContext(AuthContext); // Assuming accessToken is managed in AuthContext
    const [playlistId, setPlaylistId] = useState(null);

    const createPlaylist = async (userId, name, description) => {
        try {
            const response = await axios.post(
                `https://api.spotify.com/v1/users/${userId}/playlists`,
                {
                    name: name,
                    description: description,
                    public: false // Set to true if you want the playlist to be public
                },
                {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
            return response.data.id; // Return the new playlist ID
        } catch (error) {
            console.error('Error creating playlist:', error);
            return null;
        }
    };

    const addTracksToPlaylist = async (playlistId, trackUris) => {
        try {
            await axios.post(
                `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
                {
                    uris: trackUris
                },
                {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
            console.log('Tracks added to playlist successfully');
        } catch (error) {
            console.error('Error adding tracks to playlist:', error);
        }
    };

    const handleSavePlaylist = async () => {
        // Get track URIs from localStorage
        const tracks = JSON.parse(localStorage.getItem('tracks'));
        if (tracks && tracks.length > 0) {
            const trackUris = tracks.map(track => track.uri);
            
            // Replace 'your_user_id' with the actual user ID and give your playlist a name and optional description
            // make user id a variable
            // Playlist name = bpm
            // Playlist description = energy level = x
            const newPlaylistId = await createPlaylist('your_user_id', 'New Playlist', 'Created from the app');
            
            if (newPlaylistId) {
                await addTracksToPlaylist(newPlaylistId, trackUris);
                setPlaylistId(newPlaylistId); // Save the playlist ID if needed for later use
            }
        } else {
            console.log('No tracks to add to playlist');
        }
    };

    return (
        <div>
            <h1>Save Playlist</h1>
            <button onClick={handleSavePlaylist}>Create Playlist</button>
        </div>
    );
}

export default SavePlaylist;
