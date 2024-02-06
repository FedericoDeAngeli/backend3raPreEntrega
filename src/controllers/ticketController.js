import { ticketService } from "../services/ticketServices.js";

export async function handlePost( req, res, next ) {
    try {
        const ticket = await ticketService.createTicket(req.body)
        console.log("todo ok")
        res.json( ticket );
    } catch (error) {
        console.log("mal")
        res.send(error)
    }
}