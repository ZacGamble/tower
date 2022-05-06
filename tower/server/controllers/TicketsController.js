import { ticketsService } from "../services/TicketsService";
import BaseController from "../utils/BaseController";
export class TicketsController extends BaseController {
    constructor(){
        super('api')
        this.router
        .get('/events/:eventId/tickets', this.getTicketsByEvent)
        .post('/tickets', this.create)
        .delete('/tickets/:ticketId', this.removeTicket)
    }
    async getTicketsByEvent(req, res, next) {
        try {
            const tickets = await ticketsService.getTicketsByEvent(req.params.ticketId)
            return res.send(tickets)
        } catch (error) {
            next(error)
        }
    }
    async create(req, res, next) {
        try {
            req.body.creatorId = req.userInfo.id
            req.body.eventId = req.params.eventId
            const newTicket = await ticketsService.create(req.body)
            return res.send(newTicket)
        } catch (error) {
            next(error)
        }
    }
    async removeTicket(req, res, next) {
        try {
            const removedTicket = await ticketsService.remove(req.params.ticketId, req.userInfo.id)
            return res.send(removedTicket)
        } catch (error) {
            next(error)
        }
    }
}