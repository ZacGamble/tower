import { Auth0Provider } from "@bcwdev/auth0provider";
import { commentsService } from "../services/CommentsService";
import BaseController from "../utils/BaseController";

export class CommentsController extends BaseController {
    constructor() {
        super('api/comments')
        this.router
        .use(Auth0Provider.getAuthorizedUserInfo)
        .get('/:commentId', this.getCommentById)
        .post('', this.createComment)
        .delete('/:commentId', this.removeComment)
    }
    async getCommentById(req, res, next) {
       try {
           const comment = await commentsService.getCommentById(req.params.id)
           return res.send(comment)
       } catch (error) {
           next(error)
       }
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
            
            // req.body.id = req.params.id
           const removed = await commentsService.removeComment(req.params.commentId, req.userInfo.id)
            res.send(removed)
        } catch (error) {
            next(error)
        }
    }
}