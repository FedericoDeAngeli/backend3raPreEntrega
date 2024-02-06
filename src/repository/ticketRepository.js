import { ticketDAO } from "../dao/ticket.dao.js";

class TicketRepository{

    async createTicket(data){
        return await ticketDAO.createTicket(data)
    }

    async getTicket(id){
        return await ticketDAO.readOne(id)
    }

    async getAllTickets(){
        return await ticketDAO.readMany()
    }

    async deleteTicket(id){
        return await ticketDAO.deleteOne(id)
    }
}

export const ticketRepository = new TicketRepository()