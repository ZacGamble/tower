import { Auth0Provider } from "@bcwdev/auth0provider";
import { dbContext } from "../db/DbContext";
import { towerEventsService } from "../services/TowerEventsService";
import BaseController from "../utils/BaseController";

export class TowerEventsController extends BaseController {
    constructor(){
        super('api/events')
        this.router
        .get('', this.getAll)
        .get('/:eventId', this.getById)
        .get('/events/:eventId/tickets', this.getTicketsByEvent)
        .use(Auth0Provider.getAuthorizedUserInfo)
        .post('', this.create)
        .put('/:eventId', this.edit)
        .delete('/:eventId', this.remove)
    }
   async getAll(req, res, next) {
        try {
            const towerEvents = await towerEventsService.getAll()
            return res.send(towerEvents)
        } catch (error) {
            next(error)
        }
    }
   async getById(req, res, next) {
        try {
            const foundTowerEvent = await towerEventsService.getById(req.params.eventId)
            return res.send(foundTowerEvent)
        } catch (error) {
            next(error)
        }
    }

    async getTicketsByEvent(req, res, next) {
        try {
            const tickets = await towerEventsService.getTicketsByEvent(req.params.eventId)
            return res.send(tickets)
        } catch (error) {
            next(error)
        }
    }
   async create(req, res, next) {
        try {
            req.body.creatorId = req.userInfo.id
            const towerEvent = await towerEventsService.create(req.body)
            return res.send(towerEvent)
        } catch (error) {
            next(error)
        }
    }
   async edit(req, res, next) {
        try {
            req.body.id = req.params.eventId
            req.body.creatorId = req.userInfo.id
            const towerEvent = await towerEventsService.edit(req.body)
            return res.send(towerEvent)
        } catch (error) {
            next(error)
        }
    }
    // does this need a separate put route for the cancel feature?
   async remove(req, res, next) {
        try {
            const removedTowerEvent = await towerEventsService.remove(req.params.eventId, req.userInfo.id)
            return res.send(removedTowerEvent)
        } catch (error) {
            next(error)
        }
    }
    
}