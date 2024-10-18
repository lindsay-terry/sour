import Nav from './Nav';
import PropTypes from 'prop-types';

export default function Header({ accessToken, setAccessToken }) {

    const styles = {
        title: {
            fontFamily: 'Gloria Hallelujah, cursive',
        },
        header: {
            backgroundColor: 'var(--gunmetal)',
            color: 'var(--chartreuse)',
            borderBottom: '1px solid var(--chartreuse)'
        }
    }
    
    return (
        <div className="d-flex justify-content-between" style={styles.header}>
            <Nav accessToken={accessToken} setAccessToken={setAccessToken}/>
            <h1 className={'mx-5 p-4'} style={styles.title}>sour</h1>
        </div>
        
    )
}

Header.propTypes = { accessToken: PropTypes.string, setAccessToken: PropTypes.func };  