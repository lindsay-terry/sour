import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Auth from '../utils/auth';

export default function Home() {
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
      <div>
        {!accessToken? 
        (
            <Button onClick={getAccessToken}>Login with Spotify</Button>  
        ) : (
            <div>
                <Button >View top songs</Button>
                <Button>View Top artists</Button>
            </div>
        )
        }
             
      </div> 
    )
}