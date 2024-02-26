import winston from "winston";
import { Router } from "express";
import { NODE_ENV } from "../config.js";

const customLevelOptions = {
    levels: {
        fatal: 0,
        error: 1,
        warning: 2,
        info: 3,
        http: 4,
        debug: 5,
    },

    colors:{
        fatal: "red",
        error: "black",
        warning: "yellow",
        info: "blue",
        http: "green",
        debug: "white"
    }

}

const ProdLogger = winston.createLogger({
    levels: customLevelOptions.levels,
    transports:[
        new winston.transports.Console({
            level: "info",
            format: winston.format.combine(
                winston.format.colorize({colors: customLevelOptions.colors}),
                winston.format.simple()
            )

    
    
    }),
        new winston.transports.File({
            filename: "./errors.log", 
            level: "warning",
            format: winston.format.simple()
    })
    ]
});

const DevLogger = winston.createLogger({
    levels: customLevelOptions.levels,
    transports: [
        new winston.transports.Console({
            level: "debug",
            format: winston.format.combine(
                winston.format.colorize({colors: customLevelOptions.colors}),
                winston.format.simple()
            )
        })
    ]
})




function getLogger() {
    if (NODE_ENV === 'production') {
      return ProdLogger
    } else {
      return DevLogger
    }
    }

 export const logger = getLogger();

 export const addLogger = (req, res, next) => {
    req.logger = logger
    req.logger.http(`${req.method} en ${req.url} - ${new Date()}`)
    next()
 }








export const LoggerRouter = Router()




// LoggerRouter.get("/", (req, res) => {
//     req.logger.warn("Alerta")
//     res.send("Prueba de login")
// })

