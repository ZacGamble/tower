import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class CommentsService {
 async createComment(value){
     const res = await api.post('api/comments/', value)
     AppState.activeComments.unshift(res.data)
     logger.log('Comments service > create comment', AppState.activeComments)
 }
}

export const commentsService = new CommentsService()