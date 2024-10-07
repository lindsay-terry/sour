import Nav from './Nav';
import PropTypes from 'prop-types';

export default function Header({ accessToken, setAccessToken }) {

    const styles = {
        title: {
            fontFamily: 'Gloria Hallelujah, cursive',
        }
    }
    
    return (
        <div className="d-flex justify-content-around">
            <Nav accessToken={accessToken} setAccessToken={setAccessToken}/>
            <h1 style={styles.title}>sour</h1>
        </div>
        
    )
}

Header.propTypes = { accessToken: PropTypes.string, setAccessToken: PropTypes.func };  