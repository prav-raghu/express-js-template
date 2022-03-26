import { Get, Path, Route } from "tsoa";
import { UserModel } from "../models/user.model";
@Route("User")
export class UserController {
    users: UserModel[] = [
        {
            userId: 1,
            username: "pravir",
            password: "password@01",
            rememberMe: true,
        },
        {
            userId: 2,
            username: "shaun",
            password: "password@02",
            rememberMe: true,
        },
        {
            userId: 3,
            username: "sol",
            password: "password@03",
            rememberMe: true,
        },
    ];

    @Get("/")
    public async getAll(): Promise<UserModel[]> {
        return this.users;
    }

    @Get("{userId}")
    public async getById(@Path() userId: number): Promise<any> {
        const user = this.users.find((x) => x.userId === userId);
        return user;
    }
}
