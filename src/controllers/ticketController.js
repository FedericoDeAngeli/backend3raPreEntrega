import { ticketService } from "../services/ticketServices.js";

export async function handlePost( req, res, next ) {
    try {
        console.log(req.body[0]._id);
        const ticket = await ticketService.createTicket(req.body[0]._id)
        res.json( ticket );
    } catch (error) {
        console.log("mal")
        res.send(error)
    }
}