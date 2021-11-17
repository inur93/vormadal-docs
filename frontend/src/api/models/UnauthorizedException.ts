/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * You are missing the jwt token or the token is invalid.
 */
export type UnauthorizedException = {
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