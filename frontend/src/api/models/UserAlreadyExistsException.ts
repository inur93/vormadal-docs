/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * The email already exists in the system and another user with the same email cannot be created.
 */
export type UserAlreadyExistsException = {
    /**
     * Http status code
     */
    status: number;
    /**
     * User friendly message of the error
     */
    message: string;
    /**
     * a unique code for this type of error
     */
    code: string;
    /**
     * any relevant data for this error which can be used by the client for better handling the error
     */
    details: {
email: string;
};
}