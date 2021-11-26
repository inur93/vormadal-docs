/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Role } from './Role';

/**
 * Object used when creating a new user
 */
export type CreateUser = {
    name: string;
    email: string;
    roles: Array<Role>;
    password: string;
}