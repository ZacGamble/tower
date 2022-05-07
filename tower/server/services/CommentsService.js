import { dbContext } from "../db/DbContext"

class CommentsService {
   async createComment(body) {
        const created = await dbContext.Comments.create(body)
        await created.populate('creator');
        return created
    }
   async removeComment(body) {
        
    }

}

export const commentsService = new CommentsService()