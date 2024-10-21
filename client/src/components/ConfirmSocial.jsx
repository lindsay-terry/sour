import Container from 'react-bootstrap/Container';
import PropTypes from 'prop-types';

export default function ConfirmSocial({ userData }) {
    console.log(userData);
    const styles = {
        main: {
          color: 'var(--chartreuse)',
        },
        avatarImage: {
            borderRadius: '50%',
        }
      }

    return (
        <div style={styles.main}>
            {userData ? ( 
            <Container className={'d-flex flex-column align-items-center p-4'}>
                <h2 className={'p-2 m-2'}>Does this information look correct?</h2>
                <div className={'border rounded p-4 m-2'}>
                    <div className={'d-flex align-items-center m-2'}>
                        <img className={'mx-2'} style={styles.avatarImage} alt={`Avatar image of ${userData.display_name}`} src={userData.images[1].url}></img>
                        <p>Display Name: <strong>{userData.display_name}</strong></p>
                    </div>
                </div>
            </Container>
            ) :( 
            <Container>
                <h2>User data not found</h2>
            </Container>)}
        </div>
    )
}

ConfirmSocial.propTypes = { userData: PropTypes.object };