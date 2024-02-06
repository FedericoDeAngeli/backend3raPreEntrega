import { ticketRepository } from "../repository/ticketRepository.js";
import { cartService } from "./cartServices.js";

class TicketService{

    async createTicket(data){
        const idCart = data._id
        const cart = await cartService.getCart(idCart)
        if(!cart) throw new Error("cart not found")
        const resultados = carritos.map(carrito => {
            const totalCarrito = carrito.product.reduce((total, producto) => {
              const precioProducto = producto.pid.price;
              const cantidad = producto.quantity;
              return total + precioProducto * cantidad;
            }, 0);
            
            return { _id: idCart, total: totalCarrito, data: resultados};
          });
          const ticket = await ticketRepository.createTicket(data)
          return ticket;
        
    }

    }

    export const ticketService = new TicketService();
