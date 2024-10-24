import { useEffect, useState } from "react";
import PropTypes from 'prop-types';

export default function SharedArtists({ userId }) {
    const [sharedArtists, setSharedArtists] = useState([])

    useEffect(() => {
        const getArtists = async () => {
            try {
                const response = await fetch(`./api/users/topArtists/${userId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                if (!response.ok) {
                    console.error('Failed to fetch shared artist data for user')
                }
                const data = await response.json();
                setSharedArtists(data);
            } catch (error) {
                console.error('Error retrieving saved artist data', error);
            };
        }
        getArtists();
    }, [userId])

    return (
        <div>
            {sharedArtists.map((artist, index) => (
                <p key={index}>{artist.name}</p>
            ))}
        </div>
    )
}

SharedArtists.propTypes = { userId: PropTypes.string };