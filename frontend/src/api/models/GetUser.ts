/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Role } from './Role';

/**
 * Object of this type is returned when retrieving a user or list of users
 */
export type GetUser = {
    id: string;
    email: string;
    name: string;
    roles: Array<Role>;
}