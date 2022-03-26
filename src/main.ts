import express, { Application } from "express";
import { router } from "./routes/base.route";
import { Swagger } from "./common/swagger";
import envalid = require("envalid");
const path = require("path");
const { num, bool, str } = envalid;
const env = envalid.cleanEnv(process.env, {
    PORT: num({ default: 3000 }),
    LOGGER: bool({ default: true }),
    HOST: str({ default: "localhost:3000" }),
    NODE_ENV: str({ default: "development" }),
});
const pckg = require("../package.json");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const specs = swaggerJsdoc(Swagger.options);
const port = env.PORT;
const app: Application = express();
app.use("/documentation", swaggerUi.serve, swaggerUi.setup(specs, { explorer: true }));
app.use("/", router);
app.use("/", express.static(path.join(__dirname, "static")));
app.listen(port, () => {
    console.log(`😎 express-js-template@${pckg.version} online ${env.NODE_ENV == "development" ? `http://localhost:${env.PORT}` : "express-js-template.co.za"} in ${env.NODE_ENV} mode.😎`);
    console.log(`📖 documentation available here: ${env.NODE_ENV == "development" ? `http://localhost:${env.PORT}` : "mytelnet-auth-service.co.za"}/documentation 📖`);
});
