import { useParams } from 'react-router-dom';
import { Container, Row, Col, ListGroup, Image } from 'react-bootstrap';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/authContext.js';



function BpmCreate() {
    const accessToken = localStorage.getItem('accessToken');
    const { handleBPM } = useContext(AuthContext);
    const { trackId } = useParams();
    const [BPM, setBPM] = useState(null); // state to store the BPM value

    useEffect(() => {
        // Function to fetch BPM should be called inside useEffect
        const fetchBPM = async () => {
            const bpmValue = await handleBPM(trackId, accessToken);
            setBPM(Math.floor(bpmValue)); // Update the BPM state with the fetched value
        };
        fetchBPM();
    }, [trackId, accessToken, handleBPM]); // Dependencies array

    // If BPM is not null, display it, otherwise show a loading message
    return (
        <Container>
            <Row>
                <Col>
                    {BPM !== null ? (
                        <p>The BPM of this track is: {BPM}</p>
                    ) : (
                        <p>Loading...</p>
                    )}
                </Col>
            </Row>
        </Container>
    );
}

export default BpmCreate;
