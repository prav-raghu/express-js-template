import express, { Application } from "express";
import envalid = require("envalid");
import { router } from "./routes/base.route";
import { Swagger } from "./common/swagger";
const path = require("path");
const pckg = require("../package.json");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const specs = swaggerJsdoc(Swagger.options);
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
        this.app.use("/documentation", swaggerUi.serve, swaggerUi.setup(specs, { explorer: true }));
        this.app.use("/", router);
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
                .on("error", (err: object) => reject(err));
        });
    };
}

new Main().start();
