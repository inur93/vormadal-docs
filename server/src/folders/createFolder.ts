import { Folder } from "./folder";


export interface CreateFolder extends Pick<Folder, 'name' | 'parentFolder'> {

}