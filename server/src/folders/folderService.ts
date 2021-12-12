import { } from '../inversify/ioc';
import { provideSingleton } from "../util/provideSingleton";
import { CreateFolder } from './createFolder';
import PageModel from '../pages/page';
import FolderModel, { Folder } from "./folder";
import { UpdateFolder } from "./updateFolder";

@provideSingleton(FoldersService)
export class FoldersService {

    public async list(): Promise<Folder[]> {
        const results = await FolderModel.find({});
        return results.map(x => x.toObject());
    }

    public async update({ _id, name, parentFolder }: UpdateFolder): Promise<Folder> {
        await FolderModel.updateOne({ _id }, {
            $set: {
                name,
                parentFolder
            }
        })
        return await FolderModel.findById(_id);
    }

    public async create(page: CreateFolder): Promise<Folder> {
        return await FolderModel.create({
            ...page
        });
    }

    public async delete(id: string): Promise<void> {
        const all = await FolderModel.find({});
        const children = this.getChildFolders(id, all, [id]);
        const parent = all.find(x => x._id.toJSON() === id).parentFolder;
        // const pages = await PageModel.find({ folder: id });

        for (let child of children) {
            console.log('update pages in folder', child, 'to parent', parent)
            await PageModel.updateMany({
                folder: child
            }, {
                $set: {
                    folder: parent
                }
            })
        }

        const res = await FolderModel.deleteMany({
            _id: {
                $in: [id, ...children]
            }
        });
        console.log('res', res);
    }

    public async getPathFor(id?: string): Promise<string> {
        const all = await FolderModel.find({});

        let current = id;
        let folders = [];
        while (true) {
            let folder: Folder = all.find(x => x._id.toJSON() === current);
            if (!folder) break;
            console.log('folder', folder.parentFolder, folder.name);
            folders.push(folder.name);
            current = folder.parentFolder?.toString();
            if (!current) break;
        }

        return folders.reverse().join("/");
    }

    public getChildFolders(id: string, all: Folder[], list: string[]) {
        const children = all.filter(x => x.parentFolder === id).map(x => x._id.toJSON());
        list.push(...children);
        for (let child of children) {
            this.getChildFolders(child, all, list);
        }
        return list;
    }
}