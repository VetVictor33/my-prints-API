import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Account from 'App/Models/Account'
import Schemas from 'App/Schemas/Schemas'

export default class AccountsController {
  public async store ({ request, response }: HttpContextContract) {
    const validatedAccount = await Schemas.validadeAccount(request)
    await Account.create(validatedAccount)
    response.status(201)
    return {
      message: 'Account created!',
    }
  }
}
