import { Router } from "express";
import { logger } from "../../utils/logger.js";

export const loggerRouter = Router()

loggerRouter.get("/", function(req, res) {
logger.fatal("Probando logger Fatal"),
logger.error("Probando logger Error"),
logger.warning("Probando logger Warning"),
logger.info("Probando logger info"),
logger.debug("Probando logger Debug")
res.send("Logger test")
})