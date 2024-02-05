import { Router } from "express";
import { cartRouter } from "./cartRouter.js"
// import { sessionRouter } from "./sessionRouter.js";
import { userRouter } from "./userRouter.js";
import { productRouter } from "./productRouter.js";
 
export const apiRouter = Router()

apiRouter.use("/cart", cartRouter)
apiRouter.use("/products", productRouter)
// apiRouter.use("/sesiones",sessionRouter)
apiRouter.use("/usuarios", userRouter)