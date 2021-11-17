import { User } from "../../users/user";

/**
 * Object used when creating a new user
 * @example {
 *  "name": "John Doe",
 *  "email": "my@email.com",
 *  "roles": ["Everyone", "Admin"],
 *  "password": "my-superstrong-password"
 * }
 */
export interface CreateUser extends Pick<User, 'email' | 'name' | 'roles'> {
    password: string
}