import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class AccountService {
  async getAccount() {
    try {
      const res = await api.get('/account')
      AppState.account = res.data
    } catch (err) {
      logger.error('HAVE YOU STARTED YOUR SERVER YET???', err)
    }
  }

  //REVIEW may need to change this to get correct tickets 
  async getMyTickets(creatorId) {
    try {
      const res = await api.get('/account/tickets')
      AppState.myTickets = res.data
      logger.log('get my ticktets > account service > ', res.data)
    } catch (error) {
      logger.error('Something went wrong while fetching your tickets')
    }
  }
}

export const accountService = new AccountService()
