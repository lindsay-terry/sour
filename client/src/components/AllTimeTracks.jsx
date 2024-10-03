import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';
import TrackPreview from './TrackPreview';
import { useState, useEffect } from 'react';

export default function AllTimeTracks({ tracks }) {
    const [allTracks, setAllTracks] = useState([]);

    useEffect(() => {
        if (tracks) {
            setAllTracks(tracks.items);
        }
    }, [tracks]);

    return (
        <div>
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

AllTimeTracks.propTypes = { tracks: PropTypes.object.isRequired};