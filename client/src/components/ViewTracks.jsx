import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';
import TrackPreview from './TrackPreview';
import { useState, useEffect } from 'react';

export default function ViewTracks({ tracks, timeframe }) {
    const [allTracks, setAllTracks] = useState([]);

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

    return (
        <div>

            <h1>{heading}</h1>
            {allTracks.map((track, index) => (
                <Card style={{ width: '18rem' }} key={index}>
                    <Card.Img variant="top" src={track.album.images[1].url} />
                    <Card.Body>
                        <Card.Title>{track.name} by {track.artists[0].name}</Card.Title>
                    </Card.Body>
                    <TrackPreview previewURL={track.preview_url}/>
                </Card>
            ))}
            
        </div>
    )
}

ViewTracks.propTypes = { tracks: PropTypes.object.isRequired, timeframe: PropTypes.string.isRequired };