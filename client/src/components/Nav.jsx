import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

export default function Navigation({ accessToken }) {

    const getAccessToken = () => {
        console.log('Redirecting to Spotify...')
        const redirectUri = encodeURIComponent(import.meta.env.VITE_REDIRECT_URI);
        const clientId = import.meta.env.VITE_CLIENT_ID;
        const scope = encodeURIComponent('user-top-read');

        window.location.href = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=${redirectUri}&scope=${scope}`;
    }

    return (
        <Navbar expand="lg">
            <Container>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        {!accessToken? 
                        (
                            <Nav.Link onClick={getAccessToken}>Login with Spotify</Nav.Link>  
                        ) : null }
                        <Nav.Link href='/'>Home</Nav.Link>
                        <Nav.Link href='/top-tracks'>Top Tracks</Nav.Link>
                        <Nav.Link href='/top-artists'>Top Artists</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

Navigation.propTypes = { accessToken: PropTypes.string, setAccessToken: PropTypes.func };  