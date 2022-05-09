import { Auth0Provider } from "@bcwdev/auth0provider";

import { ticketsService } from "../services/TicketsService";
import { towerEventsService } from "../services/TowerEventsService";
import BaseController from "../utils/BaseController";
export class TicketsController extends BaseController {
    constructor(){
        super('api/tickets')
        this.router
        .use(Auth0Provider.getAuthorizedUserInfo)
        .post('', this.create)
        .delete('/:ticketId', this.removeTicket)
    }
  
    async create(req, res, next) {
        try {
            req.body.accountId = req.userInfo.id
            const newTicket = await ticketsService.create(req.body)
            // const modifiedEventCapacity= await towerEventsService.capacityChange(req.body.eventId)
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