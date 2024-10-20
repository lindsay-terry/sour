import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ConfirmSocial from '../components/ConfirmSocial';
import Button from 'react-bootstrap/Button';
import Auth from '../utils/auth';

export default function Signup() {
    const [accessToken, setAccessToken] = useState(null);
    const [user, setUser] = useState(null);
    const [agreeClicked, setAgreeClicked] = useState(false);

    const navigate = useNavigate();
    const handleCloseConfirm = () => setAgreeClicked(false);
    const handleConfirm = () => {
        console.log(user)
    }

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
    })

    return (
        <div className={'d-flex flex-column align-items-center'}>
            <ConfirmSocial userData={user} />
            {/* Confirm Modal: */}
            {/* <div className={`modal fade  ${agreeClicked && user ? 'show' : ''}`} style={{ display: agreeClicked && user? 'block' : 'none' }} tabIndex={"-1"} aria-labelledby="confirmModalLabel" aria-hidden={!agreeClicked}>
                <div className={"modal-dialog"}>
                    <div className={"modal-content bg-dark"}>
                    <div className={"modal-header"}>
                        <h1 className={"modal-title fs-5"} id="confirmModalLabel">Consent Agreement</h1>
                        {/* <button type="button" className={"btn-close"} onClick={handleClose} aria-label="Close"></button> */}
                    {/* </div>
                    <div className={"modal-body"}>
                        {user ? (
                            <ConfirmSocial userData={user}/>
                        ) : (
                            <p>Loading user data...</p>
                        )}
                        
                    </div>
                    <div className={"modal-footer"}>
                        <button type="button" className={"btn btn-danger"} onClick={handleCloseConfirm}>Cancel</button>
                        <button type="button" className={"btn btn-success"} onClick={handleConfirm}> Confirm</button>
                    </div>
                    </div>
                </div> */}
            {/* </div> */} 
            <div>
                <Button className={"btn btn-danger p-2 m-2"} onClick={handleCloseConfirm}>Cancel</Button>
                <Button  className={"btn btn-success p-2 m-2"} onClick={handleConfirm}> Confirm</Button>
            </div>
        </div>
    )
}