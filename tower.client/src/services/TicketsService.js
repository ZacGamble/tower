import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"
class TicketsService {
    async createTicket(eventId){
        const myTickets = AppState.myTickets
        if (myTickets.find(t => t.eventId == eventId)) {
            throw new Error('You already have a ticket for that event')
        }
        const res = await api.post('api/tickets', {eventId})
        AppState.myTickets.unshift(res.data)
        logger.log('tickets service > create ticket', res.data)
    }
}

export const ticketsService = new TicketsService()