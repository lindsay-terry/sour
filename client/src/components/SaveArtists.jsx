import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import Auth from '../utils/auth';

export default function SaveArtists({ artists }) {
    // console.log('ARTISTS TO SAVE', artists);
    const handleSaveArtists = async () => {
        const userId = Auth.getProfile().data.spotify_id;
        console.log(userId);
        if (artists) {
            const topArtists = artists.map(artist => ({
                name: artist.name,
                image: artist.images[0]?.url,
                popularity: artist.popularity,
                external_url: artist.external_urls.spotify,
                genres: artist.genres,
            }));
            // console.log('TOP ARTISTS', topArtists);
            try {
                const response = await fetch('/api/users/addTopArtists', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ spotify_id: userId, topArtists: topArtists })
                });

                if (!response.ok) {
                    console.error('Failed to save artist data', response);
                }
                const updatedUser = await response.json();
                console.log('Artists saved successfully', updatedUser);
            } catch (error) {
                console.error('Error saving artist data', error);
            }
        }
    };

    return (
        <div>
            <Button variant="light" onClick={handleSaveArtists}>Update Saved Tracks</Button>
        </div>
    )
}

SaveArtists.propTypes = { artists: PropTypes.array };