import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { FaSpotify } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
// import ConfirmSocial from './ConfirmSocial';
import Auth from '../utils/auth';

export default function EnableSocial() {
    // State to manage Spotify Access Token
    const [accessToken, setAccessToken] = useState(null);
    const [showModal, setShowModal] = useState(false);
    // const [user, setUser] = useState([]);
    // const [agreeClicked, setAgreeClicked] = useState(false);

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

    const getAccessToken = () => {
        console.log('Redirecting to Spotify...')
        const redirectUri = encodeURIComponent(import.meta.env.VITE_REDIRECT_URI);
        const clientId = import.meta.env.VITE_CLIENT_ID;
        const scope = encodeURIComponent('user-top-read');

        window.location.href = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=${redirectUri}&scope=${scope}`;
    }

    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);

    const handleAgree = async () => {
        if (accessToken) {
            try {
                window.location.href = '/signup'
            } catch (error) {
                console.error('Error fetching user data', error);
            }
        }
    };

    return (
        <div className={'m-3 p-4'}>
            <h2>Share with Friends!</h2>
            {accessToken ? (
                <p>Click below to enable friend sharing and see what your friends top tracks and artists are!</p>
            ) : (
                <p>Login with Spotify and enable friend sharing to see what your friends are listening to!</p>
            )}
            {accessToken ? (
                <Button className={'btn btn-success'} onClick={handleShow}>Enable Friend Sharing</Button>    
            ) : (
                <Button className={'btn btn-success'} onClick={getAccessToken}>Login With Spotify <FaSpotify /></Button>
            ) }
            <div className={`modal fade  ${showModal ? 'show' : ''}`} style={{ display: showModal ? 'block' : 'none' }} tabIndex={"-1"} aria-labelledby="consentModalLabel" aria-hidden={!showModal}>
                <div className={"modal-dialog"}>
                    <div className={"modal-content bg-dark"}>
                    <div className={"modal-header"}>
                        <h1 className={"modal-title fs-5"} id="consentModalLabel">Consent Agreement</h1>
                        <button type="button" className={"btn-close"} onClick={handleClose} aria-label="Close"></button>
                    </div>
                    <div className={"modal-body"}>
                        <div className={'d-flex justify-content-center'}>
                            <h5>By Clicking &quot;Agree,&quot; I consent to the following:</h5>
                        </div>
                        <ol>
                            <li>
                                <strong>Data Collection</strong>: I authorize Sour to save my top 10 artists and top 10 songs from my Spotify account for the purpose of sharing this information with friends I approve.
                            </li>
                            <li>
                                <strong>Profile Sharing</strong>: I authorize Sour to use my Spotify username and profile photo alongside my shared top tracks and artists.
                            </li>
                            <li>
                                <strong>Friend Sharing</strong>: I understand that my Spotify data will be shared only with friends I have selected and approved.
                            </li>
                            <li>
                                <strong>Note</strong>: Sour will never store your Spotify password or ask for it, except when using third-party authentication with Spotify.
                            </li>
                        </ol>
                        <p>I acknolwedge that I can revoke my consent at any time by accessing the &quot;Settings&quot; menu and selecting &quot;Delete Account&quot;</p>
                    </div>
                    <div className={"modal-footer"}>
                        <button type="button" className={"btn btn-secondary"} onClick={handleClose}>Decline</button>
                        <button type="button" className={"btn btn-success"} onClick={handleAgree}> Agree</button>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    )
}