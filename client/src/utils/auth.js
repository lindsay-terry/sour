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
    getProfile() {
        return decode(this.getToken());
    }

    loggedIn() {
        const token = this.getToken();
        return token && !this.isTokenExpired(token) ? true : false;
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
        return localStorage.getItem('id_token');
    }

    login(idToken) {
        localStorage.setItem('id_token', idToken);
        window.location.assign('/');
      }

    logout() {
        localStorage.removeItem('id_token');
        window.location.reload();
    }  


    
}

export default new AuthService();