import { BaseError } from "./baseException";


/**
 * The resource does not exist
 * @example {
 *  "message": "The resource does not exist",
 *  "code": "not_found"
 * }
 */
export class NotFoundException extends BaseError<{}> {

    constructor(msg?: string) {
        super(
            404,
            msg || `The resource does not exist`,
            "not_found",
            {}
        );
    }
}