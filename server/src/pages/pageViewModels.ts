import { Page } from "./page";



export type GetPage = Pick<Page, 'title' | 'content' | 'modifiedOn' | 'createdOn'> & {
    id: string
    author: string,
    modifiedBy: string,
    createdBy: string
}

export type GetPageSummary = Pick<Page, 'title' | 'modifiedOn' | 'createdOn'> & {
    id: string
    author: string,
    modifiedBy: string,
    createdBy: string,
    folder?: string
}