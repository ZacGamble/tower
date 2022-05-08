import { Auth0Provider } from "@bcwdev/auth0provider";
import { commentsService } from "../services/CommentsService";
import BaseController from "../utils/BaseController";

export class CommentsController extends BaseController {
    constructor() {
        super('api/comments')
        this.router
        .use(Auth0Provider.getAuthorizedUserInfo)
        .post('', this.createComment)
        .delete('/:commentId', this.removeComment)
    }
   async createComment(req, res, next) {
        try {
            req.body.id = req.params.eventId
            req.body.creatorId = req.userInfo.id
            const comment = await commentsService.createComment(req.body)
            res.send(comment)
        } catch (error) {
            next(error)
        }
    }
   async removeComment(req, res, next) {
        try {
            req.body.id = req.params.commentId
           const removed = await commentsService.removeComment(req.body)
            res.send(removed)
        } catch (error) {
            next(error)
        }
    }
}