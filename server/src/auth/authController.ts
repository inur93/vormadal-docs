import { inject } from 'inversify';
import {
    Body,
    Controller, Post, Route, Tags, Response
} from "tsoa";
import { AuthenticationException } from '../exceptions/authentication';
import { provideSingleton } from '../util/provideSingleton';
import { AuthService } from "./authService";
import { JwtToken } from './jwtToken';
import { UserCredentials } from './userCredentials';

@Tags('Admin')
@Route("auth")
@provideSingleton(AuthController)
export class AuthController extends Controller {

    constructor(
        @inject(AuthService) private service: AuthService
    ) {
        super();
    }

    @Response<AuthenticationException>(401, 'Invalid credentials')
    @Post("login")
    public async login(
        @Body() body: UserCredentials
    ): Promise<JwtToken> {
        return await this.service.authenticate(body.email, body.password);
    }

}
