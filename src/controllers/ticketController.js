import { TicketManager } from "../models/ticketModel.js";
import { ticketService } from "../services/ticketServices.js";

export async function handlePost( req, res, next ) {
    try {
        const userInfo = req.user.cart
        
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
            
             
       
        const ticket = await TicketManager.create({amount: totalCarrito}, {purchaser : req.user.email} )
        res.json(ticket) ;
    } catch (error) {
        console.log("mal")
        res.send(error)
    }
}