import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ConfirmSocial from '../components/ConfirmSocial';
import Button from 'react-bootstrap/Button';
import Auth from '../utils/auth';

export default function Signup() {
    const styles = {
        main: {
          color: 'var(--chartreuse)',
        },
      }
    const [accessToken, setAccessToken] = useState(null);
    const [user, setUser] = useState(null);
    const [agreeClicked, setAgreeClicked] = useState(false);

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

    const fetchUserData = async () => {
        try {
            const response = await fetch('https://api.spotify.com/v1/me', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            });
            if (!response.ok) {
                throw new Error('Error fetching user data');
            }
            const data = await response.json();
            setUser(data);
            setAgreeClicked(true);
        } catch (error) {
            console.error('Error fetching user data', error);
        }
    };

    useEffect(() => {
        if (accessToken) {
        fetchUserData();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [accessToken])

    const handleCloseConfirm = () => {
        window.location.href='/'
    };

    const handleConfirm = async () => {
        const variables = {
            username: user.display_name,
            external_url: user.external_urls.spotify,
            profile_image: user.images[0].url,
            spotify_id: user.id,
        };
        console.log('VARIABLES', variables);
        try {
            const response = await fetch('/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(variables),
            });
            console.log('RESPONSE', response);
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error);
            }
            const data = await response.json();
            console.log('User created:', data);
            Auth.login(data.createUser.token)
            window.location.href='/';
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className={'d-flex flex-column align-items-center'}>
            <ConfirmSocial userData={user} />
            <div style={styles.main} className={'d-flex flex-column align-items-center m-2 p-2'}>
                <p>Sour will save your display name, as well as allow you to share your top tracks and top artists with friends you choose.</p>
            </div>
            <div className={'my-4 p-2'}>
                <Button className={"btn btn-danger p-2 m-2"} onClick={handleCloseConfirm}>Cancel</Button>
                <Button  className={"btn btn-success p-2 m-2"} onClick={handleConfirm}> Confirm</Button>
            </div>

        </div>
    )
}