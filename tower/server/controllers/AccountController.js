import { Auth0Provider } from '@bcwdev/auth0provider'
import { accountService } from '../services/AccountService'
import BaseController from '../utils/BaseController'

export class AccountController extends BaseController {
  constructor() {
    super('account')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getUserAccount)
      .get('/tickets', this.getMyTickets)
  }

  // TODO may need to change this to get correct tickets
  async getMyTickets(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const tickets = await accountService.getMyTickets(req.body.creatorId)
      tickets.filter(t => t.accountId !== req.body.accountId)
      return res.send(tickets)
    } catch (error) {
      next(error)
    }
  }

  async getUserAccount(req, res, next) {
    try {
      const account = await accountService.getAccount(req.userInfo)
      res.send(account)
    } catch (error) {
      next(error)
    }
  }
}
