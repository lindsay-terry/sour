import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import DynamicBackground from './DynamicBackground';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import PropTypes from 'prop-types';
import ReactAudioPlayer from 'react-audio-player';
import { useState, useEffect } from 'react';


export default function ViewTracks({ tracks, timeframe }) {

    const styles = {
        card: {
            width: '18rem',
            padding: '10px',
        }
    }
    
    const [allTracks, setAllTracks] = useState([]);
    const [imageUrl, setImageUrl] = useState('');

    let heading;
    // Switch/Case to handle heading based on timeframe of query
    switch(timeframe) {
        case 'long_term':
            heading = 'All-Time Top Tracks';
            break;
        case 'medium_term':
            heading = '6 Month Top Tracks';
            break;
        case 'short_term':
            heading= 'Top Tracks This Month';
            break;
    }

    useEffect(() => {
        if (tracks) {
            setAllTracks(tracks.items);
        }
    }, [tracks]);

    useEffect(() => {
        if (allTracks.length > 0) {
            setImageUrl(allTracks[0].album.images[1].url);
        } else {
            setImageUrl('');
        }
    }, [allTracks]);

    return (
        <DynamicBackground image={imageUrl} >
        <div className='d-flex flex-column align-items-center' >
            <h1>{heading}</h1>
            <Container>
                <Row>
                {allTracks.map((track, index) => (
                    <Col key={index}>
                        <Card style={styles.card} >
                            <Card.Img variant="top" src={track.album.images[1].url} />
                            <Card.Body>
                                <Card.Title>{track.name} by {track.artists[0].name}</Card.Title>
                                    {track.preview_url ? (
                                        <ReactAudioPlayer
                                            src={track.preview_url}
                                            controls
                                            onError={(error) => console.log('Audio playback error', error)}
                                        />
                                        ) : (
                                            <p>No preview available</p>
                                    )}
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
                </Row>
            </Container>
            
        </div>
        </DynamicBackground>
    )
}

ViewTracks.propTypes = { tracks: PropTypes.object.isRequired, timeframe: PropTypes.string.isRequired };