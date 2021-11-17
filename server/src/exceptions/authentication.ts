import { BaseError } from "./baseException";


/**
 * Authentication failed.
 * @example {
 *  "message": "Username or password is invalid",
 *  "code": "authentication_failed",
 *  "details": {
 *  }
 * }
 */
export class AuthenticationException extends BaseError<{}> {

    constructor() {
        super(
            401,
            `Username or password is invalid`,
            "authentication_failed",
            {}
        );
    }
}