import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import ViewArtists from '../components/ViewArtists';
import Auth from '../utils/auth';

export default function TopArtists() {
    // State to manage Spotify Access Token
    const [accessToken, setAccessToken] = useState(null);
     // State to manage queried tracks
    const [artistList, setArtistList] = useState({ items: [] });
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

    const handleArtistQuery = useCallback(async () => {
        if (accessToken) {
            try {
                // Fetch tracks based on timeRange to query
                const response = await fetch(`https://api.spotify.com/v1/me/top/artists?time_range=${timeRange}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                });
                if (!response.ok) {
                    throw new Error('Network response not ok');
                }
                const data = await response.json();
                setArtistList(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        } 
    }, [accessToken, timeRange])

    useEffect(() => {
        handleArtistQuery();
    }, [accessToken, handleArtistQuery])

    return (
        <div>
            <p>Top Artists</p>
            <Button onClick={() => setTimeRange('short_term')}>
                Short Term
            </Button>
            <Button onClick={() => setTimeRange('medium_term')}>
                Medium Term
            </Button>
            <Button onClick={() => setTimeRange('long_term')}>
                Long Term
            </Button>
            <ViewArtists artists={artistList.items} timeframe={timeRange}/>
        </div>
    )
}