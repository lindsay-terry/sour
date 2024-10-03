import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Auth from '../utils/auth';

export default function Callback() {

    const navigate = useNavigate();

    useEffect(() => {
        const hash = window.location.hash;
        if (hash) {
            const token = hash.split('&')[0].split('=')[1];
            const expirationTime = Date.now() + 3600 * 1000;
            // localStorage.setItem('accessToken', token);
            // localStorage.setItem('accessTokenExpiration', expirationTime);
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