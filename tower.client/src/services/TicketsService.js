import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { accountService } from "./AccountService"
import { api } from "./AxiosService"
import { towerEventsService } from "./TowerEventsService"
class TicketsService {
    async createTicket(eventId){
        const myTickets = AppState.myTickets
        if (myTickets.find(t => t.eventId == eventId)) {
            throw new Error('You already have a ticket for that event')
        }
        const res = await api.post('api/tickets', {eventId})
        AppState.myTickets = [...AppState.myTickets, res.data]
        const eventResponse = await api.put('api/events/' + eventId, capacityChange)
        AppState.activeEvent = eventResponse.data
        logger.log('capacity shifted', res.data)
        // const eventTickets = await towerEventsService.getTicketsByEvent(eventId)
        // AppState.activeTickets = [eventTickets, ...AppState.activeTickets, res.data]
       
    }

    async destroyTicket(ticketId){            
            const res = await api.delete('api/tickets/' + ticketId)
            const myTickets = await accountService.getMyTickets()
            AppState.myTickets = [...AppState.myTickets]
            logger.log('destroyed ticket', res.data)
        
    }
}

export const ticketsService = new TicketsService()