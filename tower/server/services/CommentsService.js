import { dbContext } from "../db/DbContext"
import { towerEventsService } from '../services/TowerEventsService'
import { BadRequest, Forbidden } from "../utils/Errors";

class CommentsService {
    async getCommentById(id) {
        const comment = await dbContext.Comments.findById(id)
        await comment.populate('creator')
        if(!comment){
            throw new BadRequest("cannot find comment by that id")
        }
        return comment
    }
   async createComment(body) {
        const created = await dbContext.Comments.create(body)
        await created.populate('creator');
        return created
    }
   async removeComment(commentId, userId) {
        const comment = await this.getCommentById(commentId);

       if (comment.creatorId.toString() !== userId) {
           throw new Forbidden("You do not have permission to delete this.")
       }
        const removed = await dbContext.Comments.findByIdAndDelete(commentId)
        return removed
    }

}

export const commentsService = new CommentsService()