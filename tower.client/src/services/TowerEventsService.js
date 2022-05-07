import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class TowerEventsService {

    async getTowerEvents(){
        const res = await api.get('api/events')
        AppState.towerEvents = res.data
        logger.log('EventsService >', res.data)
    }
}
export const towerEventsService = new TowerEventsService()