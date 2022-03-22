import { Get, Route } from "tsoa";

@Route("Base")
export class BaseController {
    @Get("/")
    public async ping(): Promise<string> {
        return "pong";
    }
}
