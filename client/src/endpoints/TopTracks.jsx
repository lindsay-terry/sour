import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import ViewTracks from '../components/ViewTracks';
import Auth from '../utils/auth';

export default function TopTracks() {
    // State to manage Spotify Access Token
    const [accessToken, setAccessToken] = useState(null);
    // State to manage queried tracks
    const [tracklist, setTracklist] = useState({ items: [] });
    // State to manage time range of query with short term as default
    const [timeRange, setTimeRange] = useState('short_term');
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

    const handleTrackQuery = useCallback(async () => {
        if (accessToken) {
            try {
                // Fetch tracks based on timeRange to query
                const response = await fetch(`https:////api.spotify.com/v1/me/top/tracks?time_range=${timeRange}`, {
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
    }, [accessToken, timeRange])

    useEffect(() => {
        handleTrackQuery();
    }, [accessToken, handleTrackQuery])

    return (
        <div>
            <p>Top Tracks</p>
            <Button onClick={() => setTimeRange('short_term')}>
                Short Term
            </Button>
            <Button onClick={() => setTimeRange('medium_term')}>
                Medium Term
            </Button>
            <Button onClick={() => setTimeRange('long_term')}>
                Long Term
            </Button>
            <ViewTracks tracks={tracklist} timeframe={timeRange}/>

        </div>
    )
}