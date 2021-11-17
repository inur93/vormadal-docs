import { AuthenticationException } from '../exceptions/authentication';
import UserModel from '../users/user';
import { provideSingleton } from "../util/provideSingleton";
import Security from '../util/security';
import { JwtToken } from "./jwtToken";

@provideSingleton(AuthService)
export class AuthService {

    public async authenticate(email: string, password: string): Promise<JwtToken> {
        const user = await UserModel.findOne({ email }).exec() || {};
        const isValid = await Security.comparePassword(password, user.hash);

        if (!isValid) {
            throw new AuthenticationException();
        }

        return Security.createJwtToken(user);
    }






}
