import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { PiArrowFatLinesLeft, PiArrowFatLinesRight } from "react-icons/pi";
import ViewArtists from '../components/ViewArtists';
import SaveArtists from '../components/SaveArtists';
import Auth from '../utils/auth';

export default function TopArtists() {
    const styles={
        icon: {
            color: 'var(--razzle-dazzle-rose)',
            fontSize: '300%',
        },
        heading: {
            color: 'var(--chartreuse',
            textShadow: '2px 2px 2px var(--smoky-black)',
        },
    };

    // State to manage Spotify Access Token
    const [accessToken, setAccessToken] = useState(null);
     // State to manage queried tracks
    const [artistList, setArtistList] = useState({ items: [] });
    // State to manage toggling 
    const [index, setIndex] = useState(0);
    // State to manage time range of query with short term as default
    const [timeRange, setTimeRange] = useState('short_term');
    const [heading, setHeading] = useState('Top Artists This Month');
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

    const buttonSpan = 2;
    // Update index to determine what timeRange to query
    const toggleRight = () => {
        setIndex(index +1);
        // Go back to index 0 at the end of the buttonSpan
        if (index === buttonSpan) {
            setIndex(0);
        }
    };

    const toggleLeft = () => {
        setIndex(index -1);
        if (index === 0) {
            setIndex(2);
        }
    };

    useEffect(() => {
        switch (index) {
            case 0:
                setHeading('Top Artists This Month');
                setTimeRange('short_term');
                break;
            case 1:
                setHeading('Top Artists - Last 6 Months');
                setTimeRange('medium_term');
                break;
            case 2:
                setHeading('Top Artists - Last 12 Months');
                setTimeRange('long_term');
                break;
        }
    }, [index])

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
        <div style={styles.heading} className={'p-1'}>
            <div className={'d-flex flex-column justify-content-between align-items-center'}>
                <div className={'d-flex justify-content-center align-items-center flex-grow-1'}>
                    <Button variant="outline-secondary" onClick={toggleLeft}>
                        <PiArrowFatLinesLeft style={styles.icon}/>
                    </Button>
                    <h2 className={'mx-3 fs-4'}>{heading}</h2>
                    <Button variant="outline-secondary" onClick={toggleRight}>
                        <PiArrowFatLinesRight style={styles.icon}/>
                    </Button>
                </div>
                {Auth.loggedIn() ? (
                <div>
                    <SaveArtists artists={artistList.items}/>
                </div>
                ) : '' }
            </div>

            <ViewArtists artists={artistList.items}/>
        </div>
    )
}