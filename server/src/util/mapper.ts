import { Page } from "../pages/page";
import { GetPage, GetPageSummary } from "../pages/pageViewModels";
import { User } from "../users/user";
import { GetUser } from "../viewModels/users/getUser";


class Mapper {

    public toGetUser({ _id, email, name, roles }: User): GetUser {
        return { id: _id.toJSON(), email, name, roles }
    }

    public toGetPageSummary({ _id, title, createdOn, createdBy, modifiedOn, modifiedBy, author }: Page): GetPageSummary {
        return {
            id: _id.toJSON(),
            title,
            createdOn,
            modifiedOn,
            createdBy: (createdBy as User)?.name,
            modifiedBy: (modifiedBy as User)?.name,
            author: (author as User)?.name
        }
    }

    public toGetPage({ _id, title, content, createdOn, createdBy, modifiedOn, modifiedBy, author }: Page): GetPage {
        return {
            id: _id.toJSON(),
            title,
            content,
            createdOn,
            modifiedOn,
            createdBy: (createdBy as User)?.name,
            modifiedBy: (modifiedBy as User)?.name,
            author: (author as User)?.name
        }
    }

}

export default new Mapper();