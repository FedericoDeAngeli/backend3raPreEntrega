import { Router } from "express";
import { handlePost } from "../../controllers/sessionController.js";

export const sessionRouter = Router()

sessionRouter.post("/", handlePost )
