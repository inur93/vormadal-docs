import { ObjectID } from 'bson';
import { } from '../inversify/ioc';
import { provideSingleton } from "../util/provideSingleton";
import { slugify } from '../util/slugFunctions';
import { GetUser } from '../viewModels/users/getUser';
import { CreatePage } from './createPage';
import PageModel, { Page } from "./page";
import { UpdatePage } from "./updatePage";

@provideSingleton(PagesService)
export class PagesService {

    constructor() { }

    public async list(): Promise<Page[]> {
        const results = await PageModel.find({
            $or: [
                { deleted: false },
                { deleted: { $exists: false } }
            ]
        }, 'title slug folder createdOn modifiedOn author createdBy modifiedBy')
            .populate('author', 'name')
            .populate('createdBy', 'name')
            .populate('modifiedBy', 'name')
            .exec();
        return results.map(x => x.toObject());
    }

    public async get(identifier: string): Promise<Page> {
        const query = ObjectID.isValid(identifier) ?
            { $or: [{ _id: identifier }, { slug: identifier }] } :
            { slug: identifier }

        return await PageModel.findOne({
            $and: [
                query,
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
        const slug = slugify(page.title);
        return await PageModel.create({
            ...page,
            slug,
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