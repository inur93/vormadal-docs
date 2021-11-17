/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateUser } from '../models/CreateUser';
import type { GetUser } from '../models/GetUser';
import type { JwtToken } from '../models/JwtToken';
import type { UserCredentials } from '../models/UserCredentials';
import type { CancelablePromise } from '../core/CancelablePromise';
import { request as __request } from '../core/request';

export class AdminService {

    /**
     * @param requestBody 
     * @returns JwtToken Ok
     * @throws ApiError
     */
    public static login(
requestBody: UserCredentials,
): CancelablePromise<JwtToken> {
        return __request({
            method: 'POST',
            path: `/auth/login`,
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                401: `Invalid credentials`,
            },
        });
    }

    /**
     * @param userId the unique id of the user
     * @returns GetUser Ok
     * @throws ApiError
     */
    public static getUser(
userId: string,
): CancelablePromise<GetUser> {
        return __request({
            method: 'GET',
            path: `/users/${userId}`,
            errors: {
                401: `Unauthorized`,
            },
        });
    }

    /**
     * @param requestBody 
     * @returns GetUser Created
     * @throws ApiError
     */
    public static createUser(
requestBody: CreateUser,
): CancelablePromise<GetUser> {
        return __request({
            method: 'POST',
            path: `/users`,
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Email already exists`,
                401: `Unauthorized`,
            },
        });
    }

}