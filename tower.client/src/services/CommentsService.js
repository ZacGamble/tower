import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class CommentsService {
 async createComment(value){
     const res = await api.post('api/comments/', value)
     AppState.activeComments.unshift(res.data)
     logger.log('Comments service > create comment', AppState.activeComments)
 }
 
 async deleteComment(id){
     const res = await api.delete('api/comments/' + id)
     const index = AppState.activeComments.findIndex(i => i.id === res.data.id)
     AppState.activeComments.splice(index, 1)
     logger.log('removed comment', res.data)
 }
}

export const commentsService = new CommentsService()