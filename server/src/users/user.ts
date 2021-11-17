import { Document, Model, model, models, Schema, Types } from 'mongoose';

export enum Role {
    Admin = 'Admin', 
    Everyone = 'Everyone'
}
export interface User {
    /**
     * Generated id by Mongo
     */
    _id: Types.ObjectId;
    email: string;
    hash: string;
    name: string;
    apiKey?: string;
    roles: Role[]
}

const UserSchemaFields: Record<keyof Omit<User, '_id'>, any> = {
    name: String,
    email: {
        type: String,
        unique: true,
    },
    hash: String,
    apiKey: String,
    roles: {
        type: [String],
        enum: Role,
        default: [Role.Everyone]
        
    }
}

export interface UserDoc extends Omit<User, '_id'>, Document { }
export interface UserModel extends Model<UserDoc> { }
export const UserSchema = new Schema<UserDoc, UserModel>(UserSchemaFields);
export default models.User || model<UserDoc>('User', UserSchema);