import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"
class TicketsService {
    async createTicket(eventId){
        const res = await api.post('api/tickets', eventId)
        AppState.myTickets.unshift(res.data)
        logger.log('tickets service > create ticket', res.data)
    }
}

export const ticketsService = new TicketsService()