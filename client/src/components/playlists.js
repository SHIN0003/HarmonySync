
import React, { useContext, useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { AuthContext } from '/Users/andrewtai/Desktop/codingfiles/Express/client/src/contexts/authContext.js';

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
        <Col key={playlist.id} xs={12} sm={6} md={4} lg={3} className="d-flex align-items-stretch">
          <div className="playlist-card bg-light p-3 d-flex flex-column align-items-center">
            <img src={playlist.images[0]?.url} alt={playlist.name} className="img-fluid" style={{ maxHeight: '200px' }} />
            <div className="mt-2 text-center">{playlist.name}</div>
          </div>
        </Col>
      ))}
    </Row>
  </Container>
);
}

export default Playlists;
