import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class TowerEventsService {

    async createTowerEvent(value){
        const res = await api.post('api/events', value)
        AppState.activeEvent = res.data
        logger.log('towerEvents Service> create', res.data)
    }
    async getActiveEvent(routeId){
        const res = await api.get('api/events/' + routeId)
        AppState.activeEvent = res.data
        // logger.log('get active > tower Events service', active)
    }
    async getTowerEvents(){
        const res = await api.get('api/events')
        AppState.activeEvents = res.data
        AppState.activeEvents.reverse()
        // logger.log('EventsService >', res.data)
    }
    async getTowerConcerts(){
        const res = await api.get('api/events')
        const concerts =  res.data.filter(r => r.type === 'concert')
        AppState.activeEvents = concerts
        // logger.log('eventsService > get Concerts>' , concerts)
    }
    async getTowerConventions(){
        const res = await api.get('api/events')
        const conventions =  res.data.filter(r => r.type === 'convention')
        AppState.activeEvents = conventions
        // logger.log('eventsService > get conventions>' , conventions)
    }
    async getTowerDigital(){
        const res = await api.get('api/events')
        const digital =  res.data.filter(r => r.type === 'digital')
        AppState.activeEvents = digital
    }
    async getTowerSports(){
        const res = await api.get('api/events')
        const sports =  res.data.filter(r => r.type === 'sport')
        AppState.activeEvents = sports
    }
    
}
export const towerEventsService = new TowerEventsService()