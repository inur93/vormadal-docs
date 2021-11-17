import { UserAlreadyExistsException } from "../exceptions/userAlreadyExists";
import { } from '../inversify/ioc';
import { provideSingleton } from "../util/provideSingleton";
import security from "../util/security";
import { CreateUser } from "../viewModels/users/createUser";
import UserModel, { User } from "./user";

@provideSingleton(UsersService)
export class UsersService {
    public async get(_id: string): Promise<User> {
        return await UserModel.findById(_id);
    }

    public async create({ password, ...data }: CreateUser): Promise<User> {
        const existing = await UserModel.findOne({
            email: data.email
        }).exec();

        if (!!existing) {
            throw new UserAlreadyExistsException(data.email);
        }
        return await UserModel.create({
            ...data,
            hash: await security.hash(password)
        });
    }
}