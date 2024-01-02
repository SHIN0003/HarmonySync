import React, { useEffect, useState, useContext} from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, ListGroup, Image } from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/authContext.js';

const Songs = () => {
    const { playlistId } = useParams();
    const [playlistDetails, setPlaylistDetails] = useState(null);
    const [tracks, setTracks] = useState([]);
    const accessToken = localStorage.getItem('accessToken');
    const { handleBPM } = useContext(AuthContext);



  useEffect(() => {
    const fetchAllTracks = async (url) => {
      const allTracks = [];
      let nextUrl = url;
      
      while (nextUrl) {
        const response = await axios.get(nextUrl, {
          headers: { 'Authorization': `Bearer ${accessToken}` }
        });
        allTracks.push(...response.data.items);
        nextUrl = response.data.next; // Spotify provides the next set of items in 'next'
    }
      return allTracks;
    };

    const fetchPlaylistDetails = async () => {
      try {
        const detailsUrl = `https://api.spotify.com/v1/playlists/${playlistId}`;
        const detailsResponse = await axios.get(detailsUrl, {
          headers: { 'Authorization': `Bearer ${accessToken}` }
        });
        setPlaylistDetails(detailsResponse.data);

        const tracksUrl = `${detailsUrl}/tracks?limit=100`;
        const allTracks = await fetchAllTracks(tracksUrl);
        setTracks(allTracks);
        console.log(allTracks)
      } catch (error) {
        console.error('Error fetching playlist details:', error);
      }
    };
    
    if (accessToken) {
      fetchPlaylistDetails();
    }
  }, [playlistId, accessToken]);


  return (
    <Container>
        {playlistDetails && (
            <>
                <Row className="align-items-center" style={{ background: 'purple', padding: '20px', borderRadius: '6px' }}>
                    <Col md={4}>
                        <Image src={playlistDetails.images[0].url} thumbnail />
                    </Col>
                    <Col md={8}>
                        <h1>{playlistDetails.name}</h1>
                        <p>{playlistDetails.description}</p>
                    </Col>
                </Row>
                <Row className="mt-4">
                    <ListGroup>
                        {tracks.map((track, index) => ( // Removed index from the parameters if it's not being used elsewhere
                            <Link 
                                to={`/bpmCreate/${track.track.id}`} 
                                key={track.track.id + index} // Moved the key here
                                style={{ textDecoration: 'none' }}
                            >
                                <ListGroup.Item
                                    
                                    style={{
                                        marginBottom: '10px', 
                                        transition: 'transform 0.2s',
                                        cursor: 'pointer'
                                    }}
                                    onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.03)'}
                                    onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                                >   <Image src={track.track.album.images[2].url} thumbnail />
                                    {index + 1} {track.track.name} by {track.track.artists.map(artist => artist.name).join(', ')}
                                </ListGroup.Item>
                            </Link>
                        ))}
                    </ListGroup>
                </Row>
            </>
        )}
    </Container>
);  
};

export default Songs;
