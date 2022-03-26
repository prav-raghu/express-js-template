import { Get, Route } from "tsoa";

@Route("Base")
export class BaseController {
    @Get("/ping")
    public async ping(): Promise<string> {
        return "pong";
    }
}
