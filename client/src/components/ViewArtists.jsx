import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import DynamicBackground from './DynamicBackground';
import PopularityMeter from './PopularityMeter';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

export default function ViewArtists({ artists, timeframe}) {
    console.log(artists);
    const styles = {
        cardImage: {
            transition: 'filter 0.3s ease',
            maxHeight: '400px',
            maxWidth: '400px',
        },
        card: {
            width: '100%',
        }
    }
    const [imageUrl, setImageUrl] = useState('');

    // Retrieve top artist image on component mount
    useEffect(() => {
        if (artists.length > 0) {
            setImageUrl(artists[0].images[1].url);
        } else {
            setImageUrl('');
        }
    }, [artists]);

    let heading;
    // Switch/Case to handle heading based on timeframe of query
    switch (timeframe) {
        case 'long_term':
            heading = 'All-Time Top Artists';
            break;
        case 'medium_term':
            heading = 'Top Artists Last 6 Months';
            break;
        case 'short_term':
            heading = 'Top Artists This Month';
            break;
    }

    return (
        <DynamicBackground image={imageUrl} >
            <div className='d-flex flex-column align-items-center'>
                <h1>{heading}</h1>
                <Container>
                    <Row>
                        {artists.map((artist, index) => (
                            <Col xs={12} sm={12} md={12} lg={12} xl={12} key={index} className={'d-flex'} >
                                {/* <h3 className={'mx-4'}>{index+1}.</h3> */}
                                <Card className={'my-2'} style={styles.card}>
                                    <DynamicBackground image={artist.images[1].url}>
                                        <div className={'d-flex flex-column align-items-center flex-md-row w-100'}> 
                                            <Card.Img variant="top"
                                                src={artist.images[1].url}
                                                alt={`Artist image of ${artist.name}`}
                                                style={{
                                                    ...styles.cardImage,
                                                }} 
                                            />
                                            <h3 className={'position-absolute'} style={{
                                                top: '10px',
                                                left: '10px',
                                                textShadow: '1px 1px 2px var(--space-cadet)',
                                                zIndex: '10',
                                            }}>
                                                {index + 1}
                                            </h3>
                                            <Card.Body className={'d-flex justify-content-between'}>
                                                <PopularityMeter popularity={artist.popularity} name={artist.name}/>
                                            </Card.Body>
                                        </div>
                                    </DynamicBackground>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </div>
        </DynamicBackground>
    )
}

ViewArtists.propTypes = { artists: PropTypes.array.isRequired, timeframe: PropTypes.string.isRequired };