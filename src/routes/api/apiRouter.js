import { Router } from "express";
import { cartRouter } from "./cartRouter.js"
import { sessionRouter } from "./sessionRouter.js";
import { userRouter } from "./userRouter.js";
import { productRouter } from "./productRouter.js";
import { ticketRouter } from "./ticketRouter.js";
import { loggerRouter } from "./loggerRouter.js";
import { emailRouter } from "./emailRouter.js";
export const apiRouter = Router()

apiRouter.use("/cart", cartRouter)
apiRouter.use("/products", productRouter)
apiRouter.use("/sesiones",sessionRouter)
apiRouter.use("/usuarios", userRouter)
apiRouter.use("/tickets", ticketRouter)
apiRouter.use("/loggerTest", loggerRouter)
apiRouter.use("/email", emailRouter)
