import { BaseError } from "./baseException";


/**
 * You are missing the jwt token or the token is invalid.
 * @example {
 *  "message": "You are not authorized to this resource",
 *  "code": "unauthorized",
 *  "details": {
 *      "scope": "Admin"
 *  }
 * }
 */
export class UnauthorizedException extends BaseError<{}> {

    constructor(msg?: string, scope?: string) {
        super(
            401,
            msg || `You are not authorized to this resource`,
            "unauthorized",
            { scope }
        );
    }
}