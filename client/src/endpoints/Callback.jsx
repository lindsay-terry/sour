import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Callback() {

    const navigate = useNavigate();

    useEffect(() => {
        const hash = window.location.hash;
        if (hash) {
            const token = hash.split('&')[0].split('=')[1];
            localStorage.setItem('accessToken', token);
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