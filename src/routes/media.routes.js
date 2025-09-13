import express from "express";
import { imagekitAuthParams } from "../controllers/media.controller.js";

const mediaRouter = express.Router();

mediaRouter.get("/auth", imagekitAuthParams);

export default mediaRouter;
