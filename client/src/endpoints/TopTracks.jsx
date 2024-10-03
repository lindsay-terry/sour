import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import AllTimeTracks from '../components/AllTimeTracks';
import Auth from '../utils/auth';

export default function TopTracks() {
    const [accessToken, setAccessToken] = useState(null);
    const [allTimeTracks, setAllTimeTracks] = useState({ items: [] });
    const navigate = useNavigate();

    console.log('ISEXPIRED?', Auth.isTokenExpired())

    useEffect(() => {
        if (Auth.isTokenExpired()) {
            console.log('Token Expired');
            navigate('/');
        } else {
            const token = Auth.getToken();
            setAccessToken(token.token)
        }
    }, [navigate])


    const handleTrackQuery = useCallback(async () => {
        if (accessToken) {
            try {
                const response = await fetch('https:////api.spotify.com/v1/me/top/tracks?time_range=long_term', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                });

                if (!response.ok) {
                    throw new Error('Network response not ok');
                }

                const data = await response.json();
                console.log(data);
                setAllTimeTracks(data);
                
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        } 
    }, [accessToken])
    console.log('ALL TIME TRACKS:', allTimeTracks);
    useEffect(() => {
        handleTrackQuery();
    }, [accessToken, handleTrackQuery])

    return (
        <div>
            <p>Top Tracks</p>
            <AllTimeTracks tracks={allTimeTracks}/>
        </div>
    )
}