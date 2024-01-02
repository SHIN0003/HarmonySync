import { useParams } from 'react-router-dom';
import { Container, Row, Col, ListGroup, Image } from 'react-bootstrap';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios'; // Make sure you have axios installed
import { AuthContext } from '../contexts/authContext.js';

function GeneratePlaylist() {
    const accessToken = localStorage.getItem('accessToken');
    const { bpm, energy } = useParams();
    const [tracks, setTracks] = useState([]);

    useEffect(() => {
        const fetchRecommendations = async () => {
            const endpoint = `https://api.spotify.com/v1/recommendations`;
            const minTempo = parseInt(bpm) - 5;
            const maxTempo = parseInt(bpm) + 5;
            const minEnergy = parseFloat(energy) - 0.1;
            const maxEnergy = parseFloat(energy) + 0.1;
            
            const params = new URLSearchParams({
                limit: '10',
                market: 'US',
                seed_genres: 'pop',
                min_tempo: minTempo.toString(),
                max_tempo: maxTempo.toString(),
                min_energy: minEnergy.toString(),
                max_energy: maxEnergy.toString(),
            });
    
            const requestUrl = `${endpoint}?${params.toString()}`;
            console.log('Making Spotify API request to:', requestUrl); // Log the request URL
    
            try {
                const response = await axios.get(requestUrl, {
                    headers: { 'Authorization': `Bearer ${accessToken}` }
                });
    
                setTracks(response.data.tracks);
            } catch (error) {
                console.error('Error fetching recommendations:', error.response || error.message);
            }
        };
    
        if (accessToken && bpm && energy) {
            fetchRecommendations();
        }
    }, [bpm, energy, accessToken]);
    
    

    return (
        <Container>
            <Row>
                <Col>
                    <h1>Recommended Tracks</h1>
                    <ListGroup>
                        {tracks.map((track, index) => (
                            <ListGroup.Item key={track.id}>
                                <Image src={track.album.images[0].url} thumbnail />
                                <div>{track.name} by {track.artists.map(artist => artist.name).join(', ')}</div>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Col>
            </Row>
        </Container>
    );
}

export default GeneratePlaylist;
