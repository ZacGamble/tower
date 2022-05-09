import { dbContext } from "../db/DbContext"

class TicketsService {

  async create(body) {
      
        const createdTicket = await dbContext.Tickets.create(body)
        await createdTicket.populate('account TowerEvents') 
        const changedEvent = await dbContext.TowerEvents.findById(body.eventId)
        changedEvent.capacity --
        await changedEvent.save()
        
        return createdTicket
    }
  async remove(ticketId, id) {
        const removed = await dbContext.Tickets.findByIdAndDelete(ticketId)
        const event = await dbContext.TowerEvents.findOne({ticketId})
        event.capacity++
        await event.save()
        return removed
    }

}

export const ticketsService = new TicketsService()