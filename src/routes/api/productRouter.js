import { Router } from "express";
import { handleDelete, handleGet, handlePost, handlePut } from "../../controllers/productController.js";

export const productRouter = Router();

productRouter.get("/", handleGet)
productRouter.get("/:id", handleGet)

productRouter.post("/", handlePost)

productRouter.put("/:id", handlePut)

productRouter.delete("/:id", handleDelete)

