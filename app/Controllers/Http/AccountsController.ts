import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Account from 'App/Models/Account'
import Hash from '@ioc:Adonis/Core/Hash'
import Schemas from 'App/Schemas/Schemas'

export default class AccountsController {
  public async store ({ request, response }: HttpContextContract) {
    const { password } = request.body()
    let validatedAccount = await Schemas.validadeAccount(request)
    const encryptedPassword = await Hash.make(password)
    validatedAccount = {...validatedAccount, password: encryptedPassword}

    await Account.create(validatedAccount)
    response.status(201)
    return {
      message: 'Account created!',
    }
  }
}
