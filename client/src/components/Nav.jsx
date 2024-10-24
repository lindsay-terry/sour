import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { FaSpotify } from "react-icons/fa6";
import Auth from '../utils/auth';

export default function Navigation({ accessToken }) {

    const styles = {
        activeLink: {
            color: 'var(--razzle-dazzle-rose)',
            fontWeight: 'bold',
            fontSize: '120%'
        },
        inactiveLink: {
            color: 'var(--chartreuse)',
            fontSize: '120%',
        },
        menuBox: {
            color: 'var(--chartreuse)',
        },
        dropdown: {
            fontWeight: 'bold',
            fontSize: '120%',
            color: 'var(--chartreuse)',
        }
    }

    const location = useLocation();

    const getAccessToken = () => {
        console.log('Redirecting to Spotify...')
        const redirectUri = encodeURIComponent(import.meta.env.VITE_REDIRECT_URI);
        const clientId = import.meta.env.VITE_CLIENT_ID;
        const scope = encodeURIComponent('user-top-read');

        window.location.href = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=${redirectUri}&scope=${scope}`;
    }

    const handleLogout = () => {
        Auth.logout();
    }

    return (
        <Navbar expand="md" >
            <Container >
                <Navbar.Toggle aria-controls="basic-navbar-nav" data-bs-theme="dark" />
                <Navbar.Collapse id="basic-navbar-nav" >
                    <Nav className="d-flex">
                        {!accessToken? 
                        (
                            <Nav.Link className={'m-2'} style={styles.inactiveLink} onClick={getAccessToken}>Login with Spotify <FaSpotify /></Nav.Link>  
                        ) : null }
                        <Nav.Link href='/' className={'m-2'} style={location.pathname === '/' ? styles.activeLink : styles.inactiveLink}>Home</Nav.Link>
                        <Nav.Link href='/top-tracks' className={'m-2'} style={location.pathname === '/top-tracks' ? styles.activeLink : styles.inactiveLink}>Top Tracks</Nav.Link>
                        <Nav.Link href='/top-artists' className={'m-2'} style={location.pathname === '/top-artists' ? styles.activeLink : styles.inactiveLink}>Top Artists</Nav.Link>
                        {Auth.loggedIn()? (
                            <NavDropdown id='nav-dropdown' title={<span style={{ color: 'var(--razzle-dazzle-rose)' }}>Settings</span>} style={styles.dropdown} className={'m-2'} menuVariant="dark">
                                <NavDropdown.Item onClick={handleLogout} className={'p-3 m-1'}>Logout</NavDropdown.Item>
                                <NavDropdown.Item className={'p-3 m-1'} href='/profile'>My Profile</NavDropdown.Item>
                                <NavDropdown.Item className={'p-3 m-1'}>Toggle Light/Dark Mode</NavDropdown.Item>
                            </NavDropdown>
                        ) : ''}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

Navigation.propTypes = { accessToken: PropTypes.string, setAccessToken: PropTypes.func };  