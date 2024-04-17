import { TicketManager } from "../models/ticketModel.js";

class TicketDAO {

    async createTicket(data){
        const ticket = await TicketManager.create(data);
        return ticket;
    }

    async readOne(_id){
        const ticket = await TicketManager.findById(_id).lean()
        return ticket;
    }

    async readMany(){
        const tickets = await TicketManager.find().lean()
    }

    async deleteOne(id){
        await TicketManager.findByIdAndDelete(id)
    }
    
}

export const ticketDAO = new TicketDAO()