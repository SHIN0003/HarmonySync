
import React, { useContext, useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { AuthContext } from '/Users/andrewtai/Desktop/codingfiles/Express/client/src/contexts/authContext.js';

const Playlists = () => {
  const authContext = useContext(AuthContext);
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const response = await fetch('https://api.spotify.com/v1/playlists', {
          headers: {
            Authorization: `Bearer ${authContext.accessToken}`,
          },
        });
        const data = await response.json();
        setPlaylists(data.items);
      } catch (error) {
        console.error('Error fetching playlists:', error);
      }
    };

    fetchPlaylists();
  }, [authContext.accessToken]);

  return (
    <Container>
      <Row>
        {playlists.map((playlist) => (
          <Col key={playlist.id} sm={6} md={4} lg={3}>
            <div>{playlist.name}</div>
            <img src={playlist.images[0].url} alt={playlist.name} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Playlists;
