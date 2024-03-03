import express from "express";
import mongoose from "mongoose";
import { initialize } from "./utils/mocks.js";
import { faker } from "@faker-js/faker";
import swaggerUiExpress from "swagger-ui-express"


import { apiRouter } from "./routes/api/apiRouter.js";
import { MONGODB_CNX_STRING, PORT } from "./config.js"

import { sesiones } from "./middlewares/session.js";
import { autenticacion } from "./middlewares/passport.js";

import CustomError from "./services/errors/customErrors.js";
import EError from "./services/errors/enums.js";
import { addLogger } from "./utils/logger.js";
import { logger } from "./utils/logger.js";
import { specs } from "./utils/swagger.js";


await mongoose.connect(MONGODB_CNX_STRING)
if(!mongoose.connect(MONGODB_CNX_STRING)){
    CustomError.createError({
        name: "DataBase Error",
        cause: "Unable to connect to Mongo",
        message: "Check your Mongoose configuration",
        code: EError.DATABASE_ERROR
    })
}
logger.info("Connected to Mongo")


const app = express()
app.use("/apidocs", swaggerUiExpress.serve, swaggerUiExpress.setup(specs) )
app.use(addLogger)
app.use(sesiones)
app.use(autenticacion)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))






// app.use("/", webRouter)
// app.use("/static", express.static("./static"))
app.use("/api", apiRouter)



 app.listen(PORT, () => {
    logger.info("listening on port 8080")
})

 initialize()


