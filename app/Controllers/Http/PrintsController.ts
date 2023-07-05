import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Account from 'App/Models/Account'
import Print from 'App/Models/Print'
import Schemas from 'App/Schemas/Schemas'

export default class PrintsController {
  public async index ({auth} : HttpContextContract) {
    const {id} = auth.user!

    const prints = await Print.findBy('account_id', id)

    return {
      data: prints,
    }
  }

  public async store ({request, response, auth} : HttpContextContract) {
    //TODO: UPLOAD FILE AND SAVE ONLINE URL

    const {id} = auth.user!
    const account = await Account.findOrFail(id)

    const print = new Print()
    print.fill(await Schemas.validatePrint(request))

    const createdPrint = await account.related('prints').save(print)
    response.status(201)
    return {
      data: createdPrint,
    }
  }
}
