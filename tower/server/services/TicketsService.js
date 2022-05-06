import { dbContext } from "../db/DbContext"

class TicketsService {
  async getTicketsByEvent(eventId) {
        return await dbContext.Tickets.find({eventId})
    }
  async create(body) {
        const createdTicket = await dbContext.Tickets.create(body)
        await createdTicket.populate('creator')
        return createdTicket
    }
  async remove(ticketId, id) {
        const removed = await dbContext.Tickets.deleteOne(ticketId)
        return removed
    }

}

export const ticketsService = new TicketsService()