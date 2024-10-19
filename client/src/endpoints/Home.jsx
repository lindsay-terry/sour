import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaRecordVinyl } from "react-icons/fa6";
import { BsPersonSquare } from "react-icons/bs";
import Container from 'react-bootstrap/Container';
import EnableSocial from '../components/EnableSocial';
import { FaUserFriends } from "react-icons/fa";
import Auth from '../utils/auth';

export default function Home() {
  const styles = {
      main: {
        backgroundColor: 'var(--gunmetal)',
        // height: '100vh',
      },
      icons: {
        color: 'var(--razzle-dazzle-rose)',
        fontSize: '430%'
      },
      text: {
        color: 'var(--chartreuse)',
      }
    }

    

    // State to manage Spotify Access Token
    // const [accessToken, setAccessToken] = useState(null);

    // const navigate = useNavigate();

  //   useEffect(() => {
  //     if (Auth.isTokenExpired()) {
  //         console.log('Token Expired');
  //         navigate('/');
  //     } else {
  //         const token = Auth.getToken();
  //         setAccessToken(token.token)
  //     }
  // }, [navigate])

    return (
        <div style={styles.main} className={'d-flex flex-column align-items-center'}>
          <div className={'m-3 p-3'}>
            <Container style={styles.text} className={'m-3 p-4 d-flex align-items-center border rounded'}>
              <FaUserFriends style={styles.icons} />
              <EnableSocial />
            </Container>
            <Container className={'m-3 p-4 d-flex align-items-center border rounded'}>
              <FaRecordVinyl style={styles.icons}/>
                <div className={'m-3 p-4'} style={styles.text}>
                  <p>View your top tracks over 3 different time periods</p>
                </div>
            </Container>
            <Container className={'m-3 p-4 d-flex align-items-center border rounded'}>
              <BsPersonSquare style={styles.icons}/>
                <div className={'m-3 p-4'} style={styles.text}>
                  <p>View your top artists over 3 different time periods and check their popularity and genre details</p>
                </div>
            </Container>
          </div>
        </div> 

    )
}