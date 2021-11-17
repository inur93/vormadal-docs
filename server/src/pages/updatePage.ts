import { Page } from "./page";


export interface UpdatePage extends Pick<Page, 'title' | 'content'> {
    _id: string;

}