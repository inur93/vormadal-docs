import { Page } from "./page";


export interface CreatePage extends Pick<Page, 'title' | 'content' | 'folder'> {

}