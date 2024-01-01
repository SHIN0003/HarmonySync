
import React, { useContext, useEffect, useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { AuthContext } from '/Users/andrewtai/Desktop/codingfiles/Express/client/src/contexts/authContext.js';
import { Link } from 'react-router-dom';

const Playlists = () => {
  const authContext = useContext(AuthContext);
  const [playlists, setPlaylists] = useState([]);
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const accessToken = localStorage.getItem('accessToken');
  const {fetchPlaylists} = useContext(AuthContext);

  useEffect(() => {
    if (accessToken) {
      fetchPlaylists(accessToken).then(data => {
        if (data && data.items) {
          setPlaylists(data.items);
        }
      }).catch(error => console.error('Error fetching playlists:', error));
    }
  }, [accessToken, fetchPlaylists]);


  return (
    <Container>
      <Row className="gy-4">
        {playlists.map((playlist) => (
          <Col key={playlist.id} xs={12} sm={6} md={4} lg={3}>
            <Link to={`/songs/${playlist.id}`} style={{ textDecoration: 'none' }}>
              <Card 
                className="h-100" 
                onMouseOver={({ target }) => target.style.transform = 'scale(1.05)'}
                onMouseOut={({ target }) => target.style.transform = 'scale(1)'}
                style={{ cursor: 'pointer', transition: 'transform 0.3s ease' }}
              >
                <Card.Img variant="top" src={playlist.images[0]?.url} style={{ maxHeight: '250px' }} />
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Playlists;
