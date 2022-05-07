import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class TowerEventsService {

    async getTowerEvents(){
        const res = await api.get('api/events')
        AppState.towerEvents.push(res.data)
        logger.log('EventsService >', res.data)
        // logger.log('Appstate.towerEvents', AppState.towerEvents)
    }
}
export const towerEventsService = new TowerEventsService()