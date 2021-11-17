import { Document, Model, model, models, Schema, Types } from 'mongoose';
import { User } from '../users/user';

export interface Page {
    /**
     * Generated id by Mongo
     */
    _id: Types.ObjectId;
    folder: string;
    title: string;
    content: string;
    tags: string[];
    author: User | string;
    createdBy: User | string;
    createdOn: Date;
    modifiedOn: Date;
    modifiedBy: User | string;
    deleted: boolean;
}

const PageSchemaFields: Record<keyof Omit<Page, '_id'>, any> = {
    folder: String,
    title: String,
    content: String,
    tags: [String],
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    createdOn: Date,
    modifiedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    modifiedOn: Date,
    deleted: {
        type: Boolean,
        default: false
    }
}

export interface PageDoc extends Omit<Page, '_id'>, Document { }
export interface PageModel extends Model<PageDoc> { }
export const PageSchema = new Schema<PageDoc, PageModel>(PageSchemaFields);
export default models.Page || model<PageDoc>('Page', PageSchema);