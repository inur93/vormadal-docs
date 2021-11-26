import { Document, Model, model, models, Schema, Types } from 'mongoose';

export interface Folder {
    /**
     * Generated id by Mongo
     */
    _id: Types.ObjectId;
    name: string;
    parentFolder?: Folder | string;
}

const FolderSchemaFields: Record<keyof Omit<Folder, '_id'>, any> = {
    name: String,
    parentFolder: {
        type: Schema.Types.ObjectId,
        ref: 'Folder'
    },
}

export interface FolderDoc extends Omit<Folder, '_id'>, Document { }
export interface FolderModel extends Model<FolderDoc> { }
export const FolderSchema = new Schema<FolderDoc, FolderModel>(FolderSchemaFields);
export default models.Folder || model<FolderDoc>('Folder', FolderSchema);