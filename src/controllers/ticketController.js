import { TicketManager } from "../models/ticketModel.js";
import { emailService } from "../services/emailServices.js";
import { ticketService } from "../services/ticketServices.js";
import {randomUUID,  randomInt } from "crypto"
import { logger } from "../utils/logger.js";
import { smsService } from "../services/smsServicesTwilio.js";
import { ADMIN_PHONE_NUMBER } from "../config.js";



export async function handlePost( req, res, next ) {
    try {
        const userInfo = req.user.cart
        const purchaser = req.user.email
        
       async function  calcularTotalCarrito(carro) {
            let total = 0;
          
            // Iterar sobre los productos en el carrito
            carro.product.forEach((item) =>  {
              // Sumar el precio del producto multiplicado por la cantidad
             total += item.pid.price * item.quantity;
            });
          
            return total;
          }
          
          // Obtener el total del carrito
          const totalCarrito = await calcularTotalCarrito(userInfo); 
            
          const ticket = {
            _id: randomUUID(),
            code: randomInt(10, 1000 ),
            purchaseDateTime: new Date(),
            amount: totalCarrito,
            purchaser: purchaser

          }
             
       
       await TicketManager.create(ticket)

       const destinatario = "fdeangeli_90@hotmail.com"
         const asunto = "Compra realizada"
         const mensaje = ticket
    
         
      // await emailService.sendEmail(destinatario, asunto, ticket)

      //  await smsService.send(ADMIN_PHONE_NUMBER, ticket)
        res.json(ticket)
        
    } catch (error) {
      logger.error("Error en la compra")
      res.send(error)
    }
}