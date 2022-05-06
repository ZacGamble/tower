import { Auth0Provider } from "@bcwdev/auth0provider";
import { dbContext } from "../db/DbContext";
import { towerEventsService } from "../services/TowerEventsService";
import BaseController from "../utils/BaseController";

export class TowerEventsController extends BaseController {
    constructor(){
        super('api/events')
        this.router
        .use(Auth0Provider.getAuthorizedUserInfo)
        .get('', this.getAll)
        .get('/:eventId', this.getById)
        .post('', this.create)
        .put('/:eventId', this.edit)
        .delete('/eventId', this.remove)
    }
   async getAll(req, res, next) {
        try {
            const towerEvents = await towerEventsService.getAll(req.userInfo.id)
            return res.send(towerEvents)
        } catch (error) {
            next(error)
        }
    }
   async getById(req, res, next) {
        try {
            const foundTowerEvent = await towerEventsService.getById(req.params.id)
            return res.send(foundTowerEvent)
        } catch (error) {
            next(error)
        }
    }
   async create(req, res, next) {
        try {
            req.body.creatorId = req.userInfo
            const towerEvent = await towerEventsService.create(req.body)
            return res.send(towerEvent)
        } catch (error) {
            next(error)
        }
    }
   async edit(req, res, next) {
        try {
            req.body.id = req.params.id
            req.body.creatorId = req.userInfo.id
            const towerEvent = await towerEventsService.edit(req.body)
            return res.send(towerEvent)
        } catch (error) {
            next(error)
        }
    }
   async remove(req, res, next) {
        try {
            const removedTowerEvent = await towerEventsService.remove(req.params.id, req.userInfo.id)
            return res.send(removedTowerEvent)
        } catch (error) {
            next(error)
        }
    }
    
}