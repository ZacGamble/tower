import { dbContext } from "../db/DbContext"

class TicketsService {

  async create(body) {
      
        const createdTicket = await dbContext.Tickets.create(body)
        await createdTicket.populate('account')
        return createdTicket
    }
  async remove(ticketId, id) {
        const removed = await dbContext.Tickets.findByIdAndDelete(ticketId)
        return removed
    }

}

export const ticketsService = new TicketsService()