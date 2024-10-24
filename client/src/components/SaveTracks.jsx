import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import Auth from '../utils/auth';

export default function SaveTracks({ tracks }) {

    const handleSaveTracks = async () => {
        const userId = Auth.getProfile().data.spotify_id;


        if (tracks) {
            // const topTracks = tracks.map((track) => ({
            //     name: track.name,
            //     album_name: track.album.name,
            //     artist: track.artists.map(artist => ({
            //         name: artist.name
            //     })),
            //     preview_url: track.preview_url,
            // }))
            const topTracks = tracks.map(({ name, album, artists, preview_url }) => ({
                name,
                album_name: album.name,
                artist: artists.map(({ name }) => name),
                preview_url,
            }));
        console.log('TOP TRACKS:', topTracks);
            try {
                const response = await fetch('/api/users/topTracks', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ spotify_id: userId, topTracks: topTracks })
                });
    
                if (!response.ok) {
                    console.error('Failed to save track data');
                } 
                const updatedUser = await response.json();
                console.log("Tracks saved successfully", updatedUser);
            } catch (error) {
                console.error('Error saving track data', error);
            }

    }
    };

    return (
        <div>
            <Button variant="light" onClick={handleSaveTracks}>Update Saved Tracks</Button>
        </div>
    )
}

SaveTracks.propTypes = { tracks: PropTypes.array }