import { Router } from "express";
import { handlePost } from "../../controllers/ticketController.js";


export const ticketRouter = Router()

ticketRouter.get("/")
ticketRouter.post("/", handlePost)

