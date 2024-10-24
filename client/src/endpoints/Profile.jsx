import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Auth from '../utils/auth';
import Unauthorized from '../components/Unauthorized';

export default function Profile() {
    const styles={
        text: {
            color: 'var(--chartreuse)'
        },
        profileImage: {
            borderRadius: '50%',
            maxHeight: '250px'
        }
    }
    const [user, setUser] = useState(null);
    console.log(user);

    useEffect(() => {
        const fetchMyProfile = async () => {
            try {
                const response = await fetch(`/api/users/${Auth.getProfile().data.spotify_id}`);
                if (!response.ok) {
                    throw new Error('User profile not found');
                }
                const data = await response.json();
                setUser(data);
                console.log(user);
            } catch (error) {
                console.error('Error fetching user data', error);
            }
        }
        fetchMyProfile();
    }, [])
    
    return (
        <div>
        {Auth.loggedIn() && Auth.getProfile() && user ? (
            <Container style={styles.text}>
                <Row>
                    <Col xs={12} sm={12} md={12} lg={12} xl={12} className={'d-flex p-4 m-3'}>
                        <Image src={user.profile_image} alt={`Profile picture for ${user.username}`} style={styles.profileImage} ></Image>
                        <div className={'d-flex flex-column justify-content-center'}>
                            <h2 className={'m-4'} >{Auth.getProfile().data.username}</h2>
                            <h4 className={'mx-4'}>Friends: {user.friendCount} </h4>
                        </div>
                    </Col>
                    <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                        <div>Top Tracks</div>
                        {user.top_tracks.length > 0 ? (
                            <p>Top tracks here</p>
                        ) : (
                            <div>
                            <p>You have no tracks saved!</p>
                            <p>Click <a href='/top-tracks'>here</a> or go to your top tracks to update the tracks you have saved to your profile!</p>
                            </div>

                        )}
                    </Col>
                    <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                        <div>Top Artists</div>
                        {user.top_artists.length > 0 ? (
                            <p>Top Artists here</p>
                        ) : (
                            <p>you have no top artists saved</p>
                        )}
                    </Col>
                </Row>
            </Container>
        ) : (
            <Unauthorized errorCode={403} errorMessage={'Please log in to view profile!'} />
        )}
        </div>

    )
}