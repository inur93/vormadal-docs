import { Folder } from "./folder";



export type GetFolder = Pick<Folder, 'name' | 'parentFolder'> & {
    id: string
}