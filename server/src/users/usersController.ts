import { inject } from 'inversify';
import {
    Body,
    Controller,
    Get,
    Path,
    Post, Response, Route,
    Security,
    SuccessResponse,
    Tags
} from "tsoa";
import { UnauthorizedException } from '../exceptions/unauthorized';
import { UserAlreadyExistsException } from '../exceptions/userAlreadyExists';
import mapper from '../util/mapper';
import { provideSingleton } from '../util/provideSingleton';
import { CreateUser } from "../viewModels/users/createUser";
import { GetUser } from '../viewModels/users/getUser';
import { UsersService } from "./usersService";


@Security("jwt", ['Admin'])
@Response<UnauthorizedException>(401, "Unauthorized")
@Tags('Admin')
@Route("users")
@provideSingleton(UsersController)
export class UsersController extends Controller {

    constructor(
        @inject(UsersService) private userService: UsersService
    ) {
        super();
    }

    /**
     * 
     * @param userId the unique id of the user
     */
    @Get("{userId}")
    public async getUser(@Path() userId: string): Promise<GetUser> {
        return mapper.toGetUser(await this.userService.get(userId));
    }


    @Response<UserAlreadyExistsException>(400, "Email already exists")
    @SuccessResponse("201", "Created")
    @Post()
    public async createUser(
        @Body() requestBody: CreateUser
    ): Promise<GetUser> {
        this.setStatus(201); // set return status 201
        return mapper.toGetUser(await this.userService.create(requestBody));
    }
}
