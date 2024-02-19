import { Router } from "express";
import { handleDelete, handleGet, handlePost, handlePostMocK, handlePut } from "../../controllers/productController.js";
 import { soloAdmin } from "../../middlewares/authorizate.js";


export const productRouter = Router();

productRouter.get("/", handleGet)
productRouter.get("/:id", handleGet)

productRouter.post("/", soloAdmin, handlePost )
productRouter.post("/mockingProducts", handlePostMocK)

productRouter.put("/:id", soloAdmin, handlePut)

productRouter.delete("/:id", soloAdmin, handleDelete)

