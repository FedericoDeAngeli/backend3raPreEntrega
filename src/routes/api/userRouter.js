import { Router } from "express";
import { handleDelete, handleGet, handlePost, handlePut } from "../../controllers/userController.js";

export const userRouter = Router()

userRouter.get("/", handleGet)
userRouter.get("/:id", handleGet)

userRouter.post("/", handlePost)

userRouter.put("/:id", handlePut)

userRouter.delete("/:id", handleDelete)
