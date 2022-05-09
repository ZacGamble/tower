import { dbContext } from "../db/DbContext"
import { BadRequest } from "../utils/Errors"

class TicketsService {

  async create(body) {
      
        const createdTicket = await dbContext.Tickets.create(body)
        await createdTicket.populate('account event') 
        const changedEvent = await dbContext.TowerEvents.findById(body.eventId)
        changedEvent.capacity --
        await changedEvent.save()
        
        return createdTicket
    }
  async remove(ticketId, id) {
      const found = await dbContext.Tickets.findById(ticketId)
      if(found.accountId.toString() !== id){
        throw new BadRequest('You do not own this')
      }
        const removed = await dbContext.Tickets.findByIdAndDelete(ticketId)
        const event = await dbContext.TowerEvents.findById(removed.eventId)
        event.capacity++
        await event.save()
        return removed
    }

}

export const ticketsService = new TicketsService()