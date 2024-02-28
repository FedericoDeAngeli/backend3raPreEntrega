import { Router } from "express";
import { emailService } from "../../services/emailServices.js";

export const emailRouter = Router()

emailRouter.post("/", async (req, res) => {
    const destinatario = req.body.destinatario
    const asunto = req.body.asunto
    const mensaje = req.body.mensaje

   const email = await emailService.sendEmail(destinatario, asunto, mensaje)

    res.json(email)
})

