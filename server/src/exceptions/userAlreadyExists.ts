import { BaseError } from "./baseException";


/**
 * The email already exists in the system and another user with the same email cannot be created.
 * @example {
 *  "message": "johndoe@example.com",
 *  "code": "email_already_exists",
 *  "details": {
 *      "email": "johndoe@example.com"
 *  }
 * }
 */
export class UserAlreadyExistsException extends BaseError<{ email: string }> {

    constructor(email: string) {
        super(
            400,
            `${email} already exists in the system`,
            "email_already_exists",
            { email }
        );
    }
}