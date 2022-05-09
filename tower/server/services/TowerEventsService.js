import { dbContext } from "../db/DbContext"
import { BadRequest, Forbidden } from "../utils/Errors";

class TowerEventsService {
 

   async getAll() {
        return await dbContext.TowerEvents.find().populate('creator');
    }
   async getById(id) {
        const found = await dbContext.TowerEvents.findById(id).populate('creator');
        if(!found){
            throw new BadRequest('Could not find event with that id')
        }
        return found;
    }

    async getTicketsByEvent(eventId) {
        return await dbContext.Tickets.find({eventId}).populate('account')
    }  
    async getEventComments(eventId) {
        return await dbContext.Comments.find({eventId}).populate('creator')
    }
   async create(body) {
        const created = await dbContext.TowerEvents.create(body)
        await created.populate('creator');
        return created;
    }

    //TODO get this owenership check working
   async edit(body) {
        const original = await this.getById(body.id)
        // if(original.creatorId.toString() != body.creatorId) {
        //     throw new Forbidden('You do not have permission to edit this.')
        // }
        if(original.isCanceled == true) {
            throw new BadRequest('This event is no longer available')
        }
        original.name = body.name || original.name
        original.description = body.description || original.description
        original.coverImg = body.coverImg || original.coverImg
        original.location = body.location || original.location
        original.capacity = body.capacity || original.capacity
        original.startDate = body.startDate || original.startDate
        original.type = body.type || original.type
        await original.save()
        return original
    }
    // async capacityChange(body) {
    //     const original = await this.getById(body.id)
    //     original.capacity = body.capacity || original.capacity
    //     await original.save()
    //     return original
    // }
   async remove(eventId, userId) {
        const removedEvent = await this.getById(eventId)
        if(removedEvent.creatorId.toString() !== userId) {
            throw new Forbidden('You do not have permissions to do this')
        }
        removedEvent.isCanceled = true
        await removedEvent.save()
        return removedEvent;
    }

}

export const towerEventsService = new TowerEventsService()