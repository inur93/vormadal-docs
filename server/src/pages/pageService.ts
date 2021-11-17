import { } from '../inversify/ioc';
import { provideSingleton } from "../util/provideSingleton";
import { GetUser } from '../viewModels/users/getUser';
import { CreatePage } from './createPage';
import PageModel, { Page } from "./page";
import { UpdatePage } from "./updatePage";

@provideSingleton(PagesService)
export class PagesService {

    public async list(): Promise<Page[]> {
        const results = await PageModel.find({
            $or: [
                { deleted: false },
                { deleted: { $exists: false } }
            ]
        }, 'title createdOn modifiedOn author createdBy modifiedBy')
            .populate('author', 'name')
            .populate('createdBy', 'name')
            .populate('modifiedBy', 'name')
            .exec();
        return results.map(x => x.toObject());
    }

    public async get(_id: string): Promise<Page> {
        return await PageModel.findOne({
            $and: [
                { _id: _id },
                {
                    $or: [
                        { deleted: false },
                        { deleted: { $exists: false } }
                    ]
                }
            ]
        })
            .populate('author', 'name')
            .populate('createdBy', 'name')
            .populate('modifiedBy', 'name')
            .exec();
    }

    public async update({ _id, title, content }: UpdatePage, user: GetUser): Promise<Page> {
        await PageModel.updateOne({ _id }, {
            $set: {
                title,
                content,
                modifiedOn: new Date(),
                modifiedBy: user.id
            }
        })
        return await PageModel.findById(_id);
    }

    public async create(page: CreatePage, user: GetUser): Promise<Page> {
        const now = new Date();
        return await PageModel.create({
            ...page,
            createdOn: now,
            modifiedOn: now,
            createdBy: user.id,
            modifiedBy: user.id,
            author: user.id
        });
    }

    public async delete(id: string): Promise<void> {
        const res = await PageModel.updateOne({ _id: id }, {
            $set: {
                deleted: true
            }
        });
        console.log('res', res);
    }
}