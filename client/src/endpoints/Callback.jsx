import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Auth from '../utils/auth';

export default function Callback() {

    const navigate = useNavigate();
    // Authenticate with Spotify, store token and expirationTime, and redirect to home
    useEffect(() => {
        const hash = window.location.hash;
        if (hash) {
            const token = hash.split('&')[0].split('=')[1];
            const expirationTime = Date.now() + 3600 * 1000;
            Auth.setToken(token, expirationTime);
            window.location.hash = '';
            navigate('/');
        }
    }, [navigate]);

    return (
        <div>
            Loading...
        </div>
    )
}