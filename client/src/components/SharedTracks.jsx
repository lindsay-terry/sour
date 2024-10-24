import { useEffect, useState } from "react";
import PropTypes from 'prop-types';

export default function SharedTracks({ userId }) {
    const [sharedTracks, setSharedTracks] = useState([])

    useEffect(() => {
        const getTracks = async () => {
            try {
                const response = await fetch(`./api/users/topTracks/${userId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                if (!response.ok) {
                    console.error('Failed to fetch shared artist data for user')
                }
                const data = await response.json();
                setSharedTracks(data);
            } catch (error) {
                console.error('Error retrieving saved artist data', error);
            };
        }
        getTracks();
    }, [userId])

    return (
        <div>
            {sharedTracks.map((artist, index) => (
                <p key={index}>{artist.name}</p>
            ))}
        </div>
    )
}

SharedTracks.propTypes = { userId: PropTypes.string };