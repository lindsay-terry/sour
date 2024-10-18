import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';

export default function ArtistStats({ genres, followers }) {


    return (
        <Container className='bg-dark rounded opacity-75'>
            <ul>
                {genres.map((genre, index) => (
                    <li key={index}>
                        {genre}
                    </li>
                ))}
                <li>
                    {followers} followers on Spotify
                </li>
            </ul>
        </Container>
    )
}

ArtistStats.propTypes = { genres: PropTypes.array.isRequired, followers: PropTypes.number.isRequired };