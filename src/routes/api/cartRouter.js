import {Router} from "express"
import { handleDelete, handleGet, handlePost } from "../../controllers/cartController.js"

export const cartRouter = Router()

cartRouter.get("/", handleGet)
cartRouter.get("/:id", handleGet)

cartRouter.post("/", handlePost)
cartRouter.post("/:id/product/:pid", handlePost)

cartRouter.delete("/:id", handleDelete)
cartRouter.delete("/:id/product/:pid", handleDelete)


