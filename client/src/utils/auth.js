class AuthService {

    setToken(token, expirationTime) {
        localStorage.setItem('accessToken', token);
        localStorage.setItem('accessTokenExpiration', expirationTime)
    }

    getToken() {
        const token = localStorage.getItem('accessToken');
        const expiration = localStorage.getItem('accessTokenExpiration');
        console.log(token, expiration);
        const spotifyToken = {token: token, expirationTime: expiration};
        console.log(spotifyToken);
        return spotifyToken;
    }

    isTokenExpired() {
        const expiration = localStorage.getItem('accessTokenExpiration')
        if (Date.now() > expiration) {
            console.log('Token expired');
            localStorage.removeItem('accessToken');
            localStorage.removeItem('accessTokenExpiration');
            return true;
        } else {
            return false;
        }
    }
}

export default new AuthService();