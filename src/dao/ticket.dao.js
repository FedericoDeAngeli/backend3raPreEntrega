import { TicketManager } from "../models/ticketModel.js";

class TicketDAO {

    async create(data){
        const ticket = await TicketManager.create(data).toObject();
        return ticket;
    }

    async readOne(id){
        const ticket = await TicketManager.findById(id).lean()
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