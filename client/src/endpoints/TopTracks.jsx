import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import ViewTracks from '../components/ViewTracks';
import Auth from '../utils/auth';

export default function TopTracks() {
    const [accessToken, setAccessToken] = useState(null);
    // const [allTimeTracks, setAllTimeTracks] = useState({ items: [] });
    const [tracklist, setTracklist] = useState({ items: [] });
    const navigate = useNavigate();

    const [listeningTerm, setListeningTerm] = useState('');

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

    //long_term
    //medium_term
    //short_term


    const handleTrackQuery = useCallback(async () => {
        if (accessToken) {
            try {
                const response = await fetch(`https:////api.spotify.com/v1/me/top/tracks?time_range=${listeningTerm}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                });

                if (!response.ok) {
                    throw new Error('Network response not ok');
                }

                const data = await response.json();
                setTracklist(data);

                
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        } 
    }, [accessToken, listeningTerm])

    useEffect(() => {
        handleTrackQuery();
    }, [accessToken, handleTrackQuery])

    return (
        <div>
            <p>Top Tracks</p>
            <ViewTracks tracks={tracklist} timeframe={listeningTerm}/>

        </div>
    )
}