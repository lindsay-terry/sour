import { useState, useEffect } from 'react';

export default function Home() {
    const [accessToken, setAccessToken] = useState(null);

    useEffect(() => {
        if (!accessToken) {
            setAccessToken(localStorage.getItem('accessToken'))
        }
    }, [accessToken])

    // const navigate = useNavigate();

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
            <button onClick={getAccessToken}>Login with Spotify</button>  
        ) : (
            <div>
                <p>View top songs</p>
                <p>View Top artists</p>
            </div>
        )
        }
             
      </div> 
    )
}