import { dbContext } from "../db/DbContext"
import { BadRequest, Forbidden } from "../utils/Errors";

class TowerEventsService {
   async getAll(creatorId) {
        return await dbContext.TowerEvents.find({creatorId}).populate('creator');
    }
   async getById(id) {
        const found = await dbContext.TowerEvents.findById(id).populate('creator');
        if(!found){
            throw new BadRequest('Could not find event with that id')
        }
        return found;
    }
   async create(body) {
        const created = await dbContext.TowerEvents.create(body)
        await created.populate('creator');
        return created;
    }
   async edit(body) {
        
    }
   async remove(eventId, userId) {
        const removedEvent = await this.getById(eventId);
        if(removedEvent.creatorId.toString() !== userId) {
            throw new Forbidden('You do not have permissions to do this')
        }
        await removedEvent.remove()
        return removedEvent;
    }

}

export const towerEventsService = new TowerEventsService()