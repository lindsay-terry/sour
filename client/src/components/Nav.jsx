import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import Button from 'react-bootstrap/Button';
import Auth from '../utils/auth';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

export default function Navigation() {
    const [accessToken, setAccessToken] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (Auth.isTokenExpired()) {
            console.log('Token Expired');
            navigate('/');
        } else {
            const token = Auth.getToken();
            setAccessToken(token.token)
        }
    }, [navigate])

    const getAccessToken = () => {
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
                        ) : (
                            ''
                        )
                        }
                        <Nav.Link href='/'>Home</Nav.Link>
                        <Nav.Link href='/top-tracks'>Top Tracks</Nav.Link>
                        <Nav.Link href='/top-artists'>Top Artists</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}