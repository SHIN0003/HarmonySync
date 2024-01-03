import axios from 'axios';
import { useState, useContext } from 'react';
import { AuthContext } from '../contexts/authContext.js';
import { useParams } from 'react-router-dom';

function SavePlaylist() {
    const { fetchUser } = useContext(AuthContext); // Assuming accessToken is managed in AuthContext
    const [playlistId, setPlaylistId] = useState(null);
    const { bpm, energy} = useParams();
    const [userId, setUserId] = useState(null);
    const accessToken = localStorage.getItem('accessToken');
    const [successMessage, setSuccessMessage] = useState(''); // State to hold the success message
    const [errorMessage, setErrorMessage] = useState('');
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
    
            try {
                // Assuming fetchUser function returns the user profile directly
                const userProfile = await fetchUser(accessToken);
                console.log(userProfile)
                const userId = userProfile.id;
    
                // Now we check if we got the user ID
                if (userId) {
                    // Use the user ID to create a new playlist
                    const newPlaylistId = await createPlaylist(userId, `${bpm} BPM Playlist`, `Energy level: ${energy}`);
                    
                    if (newPlaylistId) {
                        // Add tracks to the newly created playlist
                        await addTracksToPlaylist(newPlaylistId, trackUris);
                        setPlaylistId(newPlaylistId); // Save the playlist ID if needed for later use
                        setSuccessMessage(`Playlist created successfully! Playlist ID: ${newPlaylistId}`); // Set the success message
                        setErrorMessage('');
                        console.log(`Playlist created with ID: ${newPlaylistId}`);
                    }
                } else {
                    console.log('Unable to retrieve user ID');
                }
            } catch (error) {
                console.error('Error during playlist creation:', error);
                setErrorMessage('Error creating playlist'); // Set the error message
                setSuccessMessage('');
            }
        } else {
            console.log('No tracks to add to playlist');
        }
    };
    

    return (
        <div>
            <h1>Save Playlist</h1>
            <button onClick={handleSavePlaylist}>Create Playlist</button>
            {successMessage && <div className="alert alert-success">{successMessage}</div>}
            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>} {/* Conditional rendering of error message */}
        </div>
    );
}

export default SavePlaylist;
