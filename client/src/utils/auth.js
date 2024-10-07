class AuthService {

    setToken(token, expirationTime) {
        localStorage.setItem('accessToken', token);
        localStorage.setItem('accessTokenExpiration', expirationTime)
    }

    getToken() {
        const token = localStorage.getItem('accessToken');
        const expiration = localStorage.getItem('accessTokenExpiration');
        const spotifyToken = {token: token, expirationTime: expiration};
        return spotifyToken;
    }

    isTokenExpired() {
        const expiration = localStorage.getItem('accessTokenExpiration')
        if (Date.now() > expiration) {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('accessTokenExpiration');
            return true;
        } else {
            return false;
        }
    }
}

export default new AuthService();