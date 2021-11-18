import axios from "axios"
import { AuthUser } from "../contexts/AuthContext";
import { storeJwt } from "./security";


export const add401interceptor = (setUser: (user: AuthUser) => void) => {
    axios.interceptors.response.use(function (response) {
        return response;
    }, function (err) {
        if (err.response.status === 401) {
            storeJwt('');
            setUser(new AuthUser());
        }
        return Promise.reject(err);
    })
}