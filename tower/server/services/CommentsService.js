import { dbContext } from "../db/DbContext"
import { towerEventsService } from '../services/TowerEventsService'
import { Forbidden } from "../utils/Errors";

class CommentsService {
   async createComment(body) {
        const created = await dbContext.Comments.create(body)
        await created.populate('creator');
        return created
    }
   async removeComment(body) {
       const commentOwner = (await towerEventsService.getById(body.eventId)).creatorId
       if (body.creatorId !== commentOwner._id ) {
           throw new Forbidden("You do not have permission to delete this.")
       }
        const removed = await dbContext.Comments.findByIdAndDelete(body.id)
        return removed
    }

}

export const commentsService = new CommentsService()