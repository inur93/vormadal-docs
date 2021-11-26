import { inject } from 'inversify';
import {
    Body,
    Controller,
    Delete,
    Get,
    Path,
    Post, Put, Response, Route,
    Security,
    SuccessResponse,
    Tags
} from "tsoa";
import { NotFoundException } from '../exceptions/notFound';
import { UnauthorizedException } from '../exceptions/unauthorized';
import mapper from '../util/mapper';
import { provideSingleton } from '../util/provideSingleton';
import { CreateFolder } from './createFolder';
import { FoldersService } from "./folderService";
import { GetFolder } from './folderViewModels';
import { UpdateFolder } from './updateFolder';

type UpdateFolderBody = Omit<UpdateFolder, '_id'>;

@Security("jwt", ['Admin'])
@Response<UnauthorizedException>(401, "Unauthorized")
@Tags('Folder')
@Route("folders")
@provideSingleton(FoldersController)
export class FoldersController extends Controller {

    constructor(
        @inject(FoldersService) private folderService: FoldersService
    ) {
        super();
    }

    @Get("")
    public async getAllFolders(): Promise<GetFolder[]> {
        const results = await this.folderService.list();
        return results.map(mapper.toGetFolder);
    }

    @SuccessResponse("201", "Created")
    @Post()
    public async createFolder(
        @Body() requestBody: CreateFolder
    ): Promise<GetFolder> {
        this.setStatus(201); // set return status 201
        return mapper.toGetFolder(await this.folderService.create(requestBody));
    }


    @Put("{folderId}")
    public async updateFolder(
        @Path() folderId: string,
        @Body() requestBody: UpdateFolderBody
    ): Promise<GetFolder> {

        const result = await this.folderService.update({
            _id: folderId,
            ...requestBody
        });
        if (result) {
            this.setStatus(201); // set return status 201
            return mapper.toGetFolder(result);
        }
        throw new NotFoundException("Folder does not exist");
    }

    @Delete("{folderId}")
    public async deleteFolder(
        @Path() folderId: string
    ): Promise<void> {
        await this.folderService.delete(folderId);
    }
}
