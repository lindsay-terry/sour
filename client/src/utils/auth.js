import decode from 'jwt-decode';

class AuthService {
    // Spotify Access Tokens
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

    // JWT Token
    // Get data of user logged in from JWT Token payload
    getProfile() {
        return decode(this.getJWTToken());
    }

    // Check if logged in with JWT token
    loggedIn() {
        const token = this.getJWTToken();
        return token && !this.isJWTTokenExpired(token) ? true : false;
    }

    isJWTTokenExpired(token) {
        const decoded = decode(token);
        if (decoded.exp < Date.now() / 1000) {
          localStorage.removeItem('id_token');
          return true;
        }
        return false;
    }

    getJWTToken() {
        const JWTToken = localStorage.getItem('id_token');
        return JWTToken;
        // return localStorage.getItem('id_token');
    }

    login(idToken) {
        localStorage.setItem('id_token', idToken);
        window.location.assign('/');
      }

    logout() {
        localStorage.removeItem('id_token');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('accessTokenExpiration');
        window.location.reload();
    }  


    
}

export default new AuthService();