/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * Authentication failed.
 */
export type AuthenticationException = {
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
    details: any;
}