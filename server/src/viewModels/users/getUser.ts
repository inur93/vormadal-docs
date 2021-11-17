import { Role } from "../../users/user";

/**
 * Object of this type is returned when retrieving a user or list of users
 * @example {
 *  "id": "617f0022093fae385642f6a1",
 *  "email": "johndoe@example.com",
 *  "name": "John Doe",
 *  "roles": ["Admin", "Everyone"]
 * }
 */
 export interface GetUser {
    id: string;
    email: string;
    name: string;
    roles: Role[]
}