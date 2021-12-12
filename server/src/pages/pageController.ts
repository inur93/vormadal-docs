import { inject } from 'inversify';
import {
    Body,
    Controller,
    Delete,
    Get,
    Path,
    Post, Put, Request, Response, Route,
    Security,
    SuccessResponse,
    Tags
} from "tsoa";
import { NotFoundException } from '../exceptions/notFound';
import { UnauthorizedException } from '../exceptions/unauthorized';
import mapper from '../util/mapper';
import { provideSingleton } from '../util/provideSingleton';
import { CreatePage } from './createPage';
import { PagesService } from "./pageService";
import { GetPage, GetPageSummary } from './pageViewModels';
import { UpdatePage } from './updatePage';


@Security("jwt", ['Admin'])
@Response<UnauthorizedException>(401, "Unauthorized")
@Tags('Page')
@Route("pages")
@provideSingleton(PagesController)
export class PagesController extends Controller {

    constructor(
        @inject(PagesService) private pageService: PagesService
    ) {
        super();
    }

    @Get("")
    public async getAllPages(): Promise<GetPageSummary[]> {
        const results = await this.pageService.list();
        return results.map(mapper.toGetPageSummary);
    }

    /**
     * 
     * @param identifier the UUID or slug of the page
     */
    @Get("{identifier}")
    public async getPage(@Path() identifier: string): Promise<GetPage> {
        const result = await this.pageService.get(identifier);
        if (result) {
            return mapper.toGetPage(result);
        }
        throw new NotFoundException("The page does not exist anymore");
    }

    @SuccessResponse("201", "Created")
    @Post()
    public async createPage(
        @Body() requestBody: CreatePage,
        @Request() request: any
    ): Promise<GetPage> {
        this.setStatus(201); // set return status 201
        return mapper.toGetPage(await this.pageService.create(requestBody, request.user));
    }

    @Put("{pageId}")
    public async updatePage(
        @Path() pageId: string,
        @Body() requestBody: Omit<UpdatePage, '_id'>,
        @Request() request: any
    ): Promise<GetPage> {

        const result = await this.pageService.update({
            _id: pageId,
            ...requestBody
        }, request.user);
        if (result) {
            this.setStatus(201); // set return status 201
            return mapper.toGetPage(result);
        }
        throw new NotFoundException("Page does not exist");
    }

    @Delete("{pageId}")
    public async deletePage(
        @Path() pageId: string
    ): Promise<void> {
        await this.pageService.delete(pageId);
    }
}
