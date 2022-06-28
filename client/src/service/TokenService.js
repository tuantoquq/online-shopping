class TokenService {
    setLocalAccessToken(role, accessToken){
        localStorage.setItem(`${role}_access_token`, accessToken);
    }
    setLocalRefreshToken(role, refreshToken){
        localStorage.setItem(`${role}_refresh_token`, refreshToken);
    }
    getLocalAccessToken(role){
        return localStorage.getItem(`${role}_access_token`);
    }
    getLocalRefreshToken(role){
        return localStorage.getItem(`${role}_refresh_token`);
    }
    updateLocalAccessToken(role,accessToken){
        localStorage.setItem(`${role}_access_token`, accessToken);
    }
    updateLocalRefreshToken(role,refreshToken){
        localStorage.setItem(`${role}_refresh_token`, refreshToken);
    }
    removeLocalAccessToken(role){
        localStorage.removeItem(`${role}_access_token`);
    }
    removeLocalRefreshToken(role){
        localStorage.removeItem(`${role}_refresh_token`);
    }
}

export default new TokenService();