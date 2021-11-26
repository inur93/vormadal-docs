import { Folder } from "./folder";


export interface UpdateFolder extends Pick<Folder, 'name'> {
    _id: string;
    parentFolder: string;
}