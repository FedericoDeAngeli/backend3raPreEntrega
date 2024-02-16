import { Router } from "express";
import { handleDelete, handleGet, handlePost, handlePostMocK, handlePut } from "../../controllers/productController.js";
import { dbProductos } from "../../models/productModel.js";
import CustomError from "../../services/errors/customErrors.js";
import EError from "../../services/errors/enums.js";

export const productRouter = Router();

productRouter.get("/", handleGet)
productRouter.get("/:id", handleGet)

productRouter.post("/", handlePost)
productRouter.post("/mockingProducts", handlePostMocK)

productRouter.put("/:id", handlePut)

productRouter.delete("/:id", handleDelete)

