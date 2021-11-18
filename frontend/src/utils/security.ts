import decodeJwt from 'jwt-decode';
import { OpenAPI } from "../api";
type JwtData = {
    exp: number,
    iat: number
}
export const getStoredJwt = () => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
        const data = decodeJwt<JwtData>(jwt);
        if (new Date(data.exp*1000) > new Date()) {
            OpenAPI.TOKEN = jwt;
            return jwt;
        } else {
            storeJwt('');
            return undefined;
        }
    }
    OpenAPI.TOKEN = '';
    return jwt;
}

export const storeJwt = (jwt: string) => {
    OpenAPI.TOKEN = jwt;
    localStorage.setItem('jwt', jwt);
}