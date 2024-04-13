import { TicketManager } from "../models/ticketModel.js";
import { emailService } from "../services/emailServices.js";
import { ticketService } from "../services/ticketServices.js";
import {randomUUID,  randomInt } from "crypto"
import { logger } from "../utils/logger.js";
import { smsService } from "../services/smsServicesTwilio.js";
import { ADMIN_PHONE_NUMBER } from "../config.js";
import { dbProductos } from "../models/productModel.js";
import { productDAOModel } from "../dao/product.dao.js";



export async function handlePost( req, res, next ) {
    try {
        const userInfo = req.user.cart
        const purchaser = req.user.email

        async function actualizarStock(pid, stock){
          await productDAOModel.updateStock(pid, stock)

        }
        
       async function  calcularTotalCarrito(carro) {
            let total = 0;
            for (const item of carro.product) {
              const producto = item.pid;
              const cantidadComprada = item.quantity;
              
              // Verificar si hay suficiente stock disponible
              if (producto.stock >= cantidadComprada) {
                  // Sumar el precio del producto multiplicado por la cantidad
                  total += producto.price * cantidadComprada;
      
                  // Calcular el nuevo stock
                  const nuevoStock = producto.stock - cantidadComprada;
      
                  // Actualizar el stock en el array de productos
                  await actualizarStock(producto._id, nuevoStock);

            }else{
              console.log('error en cantidad de producto')
            };

            };

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

       const destinatario = purchaser
         const asunto = "Compra realizada"
         const mensaje = ticket
    
         
       await emailService.sendEmail(destinatario, asunto, ticket)

        await smsService.send(ADMIN_PHONE_NUMBER, ticket)
        res.json(ticket)
        
    } catch (error) {
      logger.error("Error en la compra")
      res.send(error)
    }
}