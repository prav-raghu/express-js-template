import express, { Application } from "express";
import envalid = require("envalid");
import cors = require("cors");
import helmet from "helmet";
import path from "path";
import bodyParser from "body-parser";
import { RegisterRoutes } from "./routes";
import * as swaggerJson from "./swagger.json";
import * as swaggerUI from "swagger-ui-express";
const pckg = require("../package.json");
const { num, bool, str } = envalid;
const env = envalid.cleanEnv(process.env, {
    PORT: num({ default: 3000 }),
    LOGGER: bool({ default: true }),
    HOST: str({ default: "localhost:3000" }),
    NODE_ENV: str({ default: "development" }),
});
const port = env.PORT;

export class Main {
    private app: Application;

    constructor() {
        this.app = express();
        this.app.use(helmet());
        this.app.use(cors());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(bodyParser.json());
        this.app.use(["/documentation"], swaggerUI.serve, swaggerUI.setup(swaggerJson));
        RegisterRoutes(this.app);
        this.app.use("/", express.static(path.join(__dirname, "static")));
    }

    public start = () => {
        return new Promise((resolve, reject) => {
            this.app
                .listen(port, () => {
                    console.log(`😎 express-js-template@${pckg.version} online ${env.NODE_ENV == "development" ? `http://localhost:${env.PORT}` : "express-js-template.co.za"} in ${env.NODE_ENV} mode.😎`);
                    console.log(`📖 documentation available here: ${env.NODE_ENV == "development" ? `http://localhost:${env.PORT}` : "mytelnet-auth-service.co.za"}/documentation 📖`);
                    resolve(port);
                })
                .on("error", (exception: object) => {
                    console.error(exception);
                    reject(exception);
                });
        });
    };
}

new Main().start();
