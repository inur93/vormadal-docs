import jwtDecode from 'jwt-decode';
import { createContext } from "react";
import { GetUser } from "../api";
import { getStoredJwt } from "../utils/security";

export class AuthUser {

    private user?: GetUser;
    constructor(token?: string) {
        const jwt = token || getStoredJwt();
        if (jwt) {
            this.user = jwtDecode<GetUser>(jwt);
        }
    }

    get isLoggedIn() {
        return !!this.user;
    }

    get id() {
        return this.user?.id;
    }

    get fullName() {
        return this.user?.name;
    }
}

type UserContextType = [
    AuthUser,
    (user: AuthUser) => void
]

const AuthContext = createContext<UserContextType>([new AuthUser(), () => { }]);

export default AuthContext;

