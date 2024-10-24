import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';

export default function Unauthorized({errorCode, errorMessage}) {
    const styles={
        errorCode: {
            color: 'var(--bittersweet)'
        },
        errorMessage: {
            color: 'var(--linen)'
        },
    }

    return (
        <Container className={'text-center mt-5'}>
            <Row>
                <Col className={'border rounded m-4 p-4'}>
                    <h1 className={'p-2'} style={styles.errorCode}>
                        {errorCode}
                    </h1>
                    <h2 className={'p-2'} style={styles.errorMessage}>
                        {errorMessage}
                    </h2>
                    <Button variant="danger" className={'p-2 m-2'} href='/'>
                        Back to Home
                    </Button>
                </Col>
            </Row>
        </Container>
    )
}

Unauthorized.propTypes = { errorCode: PropTypes.number, errorMessage: PropTypes.string };