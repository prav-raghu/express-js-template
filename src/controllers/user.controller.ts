import { Get, Route } from "tsoa";

@Route("User")
export class UserController {
    @Get("/test")
    public async ping(): Promise<string> {
        return "pong";
    }
}
