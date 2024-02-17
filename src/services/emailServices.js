import nodemailer from "nodemailer"
import { USER_EMAIL, USER_PASSWORD } from "../config.js"


const transport = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    auth:{
        user: USER_EMAIL,
        pass: USER_PASSWORD
    }
})


class EmailService{
    async sendEmail(destinatario, asunto, mensaje,){
        const email = {
            from: USER_EMAIL,
            to: destinatario,
            subject: asunto,
            text: mensaje

        }

        await transport.sendMail(email)
    }
    
}

export const emailService = new EmailService()