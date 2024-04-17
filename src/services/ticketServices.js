import { ticketRepository } from "../repository/ticketRepository.js";
import { cartService } from "./cartServices.js";

class TicketService{

    async createTicket(){
        
        const cart = await cartService.getCart(idCart)
        if(!cart) throw new Error("cart not found")
        

            const totalCarrito = cart.product.reduce((total, producto) => {
              const precioProducto = producto.pid.price;
              const cantidad = producto.quantity;
              return total + precioProducto * cantidad;
            }, 0);
            
            return { _id: idCart, total: totalCarrito, data: resultados};
          ;
          const ticket = await ticketRepository.createTicket(data)
          return ticket;
        
    }

    async getTicket(id){
        return await ticketRepository.getTicket(id)
    }

    }

    export const ticketService = new TicketService();
