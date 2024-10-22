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

            const sourLogin = async () => {
                try {
                    const response = await fetch('https://api.spotify.com/v1/me', {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    if (!response.ok) {
                        throw new Error('Error fetching user data');
                    }
                    const data = await response.json();
                    const spotifyId = data.id;
                    if (spotifyId) {
                        try {
                            const loginResponse = await fetch('/api/users/login', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({ spotify_id: spotifyId })
                            });
                            if (!loginResponse.ok) {
                                const errorData = await loginResponse.json();
                                console.log('User not in DB:', errorData);
                                navigate('/');
                            } else {
                                // successful login
                                const loginData = await loginResponse.json();
                                Auth.login(loginData.token);
                                navigate('/');
                            }
                            const data = await response.json();
                            Auth.login(data.token)
                        } catch (error) {
                            console.error(error);
                        }
                } else {
                    console.log('Error retrieving spotifyId');
                }
                } catch (error) {
                    console.error('Error fetching user data', error);
                }
            }
            sourLogin();
            // navigate('/');
        }
    }, [navigate]);

    return (
        <div>
            Loading...
        </div>
    )
}