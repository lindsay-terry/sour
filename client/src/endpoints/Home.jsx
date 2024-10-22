import { FaRecordVinyl } from "react-icons/fa6";
import { BsPersonSquare } from "react-icons/bs";
import Container from 'react-bootstrap/Container';
import EnableSocial from '../components/EnableSocial';
import { FaUserFriends } from "react-icons/fa";
import Auth from '../utils/auth';

export default function Home() {
  const styles = {
      icons: {
        color: 'var(--razzle-dazzle-rose)',
        fontSize: '430%'
      },
      text: {
        color: 'var(--chartreuse)',
      }
    }

    return (
        <div className={'d-flex flex-column align-items-center'}>
          <div className={'m-3 p-3'}>
            <Container style={styles.text} className={'m-3 p-4 d-flex align-items-center border rounded'}>
              <FaUserFriends style={styles.icons} />
              {/* If user authenticated with both Spotify token and JWT Token, show welcome username */}
              {Auth.loggedIn() && Auth.getProfile() ? (
                <h4 className={'m-3 p-4'}>Welcome, {Auth.getProfile().data.username}! </h4>
              ) : (
                // If user is not authenticated with JWT, show component to enable social features
                <EnableSocial />
              )}
            </Container>
            {/* These two containers below remain consistent regardless */}
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