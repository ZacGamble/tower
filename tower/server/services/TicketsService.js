import { dbContext } from "../db/DbContext"

class TicketsService {
  async getTicketsByEvent(ticketId) {
        return await dbContext.Tickets.find({ticketId})
    }
  async create(body) {
        const createdTicket = await dbContext.Tickets.create(body)
        await createdTicket.populate('creator')
        return createdTicket
    }
  async remove(ticketId, id) {
        const removed = await dbContext.Tickets.deleteOne(ticketId)
    }

}

export const ticketsService = new TicketsService()