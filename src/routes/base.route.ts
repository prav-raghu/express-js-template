import express from "express";
import { BaseController } from "../controllers/base.controller";
export const router = express.Router();
const controller = new BaseController();
router.get("/", async (request, response) => {
    return response.send(await controller.ping());
});
