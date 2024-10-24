import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import DynamicBackground from './DynamicBackground';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import PropTypes from 'prop-types';
import ReactAudioPlayer from 'react-audio-player';
import { useState, useEffect } from 'react';


export default function ViewTracks({ tracks }) {
    const styles = {
        customAudioPlayer: {
            width: '100%',
        },
        cardImage: {
            transition: 'filter 0.3s ease',
        },
        blurred: {
            filter: 'blur(5px',
        },
        imageOverlay: {
            position: 'absolute',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            opacity: '0',
            transition: 'opacity 0.3s ease',
        },
        overlayVisible: {
            opacity: '1',
        }
    }
    
    const [allTracks, setAllTracks] = useState([]);
    const [imageUrl, setImageUrl] = useState('');
    const [hoveredImage, setHoveredImage] = useState(null);

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
    // console.log(allTracks);

    return (
        <DynamicBackground image={imageUrl} >
        <div className='d-flex flex-column align-items-center' >
            <Container>
                <Row>
                {allTracks.map((track, index) => (
                    <Col xs={12} sm={12} md={6} lg={4} xl={3} key={index}>
                        <Card className={'my-2'}>
                            <div className={'d-flex justify-content-center w-100'}>
                                <Card.Img variant="top" 
                                    src={track.album.images[1].url} 
                                    alt={`Album art for ${track.album.name} by ${track.artists[0].name}`}
                                    onMouseEnter={() => setHoveredImage(index)}
                                    onMouseLeave={() => setHoveredImage(null)}    
                                    style={{
                                        ...styles.cardImage,
                                        ...(hoveredImage === index && window.innerWidth > 576 ? styles.blurred : {}),
                                    }}
                                />
                    
                                    <div className={'d-flex flex-column align-items-center justify-content-center text-light w-100'} style={{
                                        ...styles.imageOverlay,
                                        ...(hoveredImage === index || window.innerWidth <= 576 ? styles.overlayVisible : {}),
                                    }}
                                    >
                                        <h4>{track.name}</h4>
                                        <h5>{track.artists[0].name}</h5>
                                    </div>
                                </div>
                            <Card.Body>
                                    {track.preview_url ? (
                                        <ReactAudioPlayer
                                            src={track.preview_url}
                                            controls
                                            onError={(error) => console.log('Audio playback error', error)}
                                            className={''}
                                            style={styles.customAudioPlayer}
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

ViewTracks.propTypes = { tracks: PropTypes.object.isRequired };