import { useParams } from 'react-router-dom';
import { Container, Row, Col, ListGroup, Image } from 'react-bootstrap';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/authContext.js';
import { Link } from 'react-router-dom';


function BpmCreate() {
    const accessToken = localStorage.getItem('accessToken');
    const { handleBPM, fetchEnergy } = useContext(AuthContext);
    const { trackId } = useParams();
    const [BPM, setBPM] = useState(null); // state to store the BPM value
    const [energy, setEnergy] = useState(null);
    useEffect(() => {
        // Function to fetch BPM should be called inside useEffect
        const fetchBPM = async () => {
            const bpmValue = await handleBPM(trackId, accessToken);
            setBPM(bpmValue); // Update the BPM state with the fetched value
        };
        const getEnergy = async () => {
            const temp = await fetchEnergy(trackId, accessToken);
            setEnergy(temp);
        }
        fetchBPM();
        getEnergy();
    }, [trackId, accessToken, handleBPM]); // Dependencies array

    // If BPM is not null, display it, otherwise show a loading message
    return (
        <Container>
            <Row>
                <Col>
                    //pass these values to another component
                    <Link to={`/generateplaylist/${BPM}/${energy}`} style={{ textDecoration: 'none' }}>
                        <button>Generate Playlist</button>
                    </Link>

                </Col>
            </Row>
        </Container>
    );
}

export default BpmCreate;