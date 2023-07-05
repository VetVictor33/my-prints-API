import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Account from 'App/Models/Account'
import Schemas from 'App/Schemas/Schemas'

export default class AccountsController {
  public async signup ({ request, response }: HttpContextContract) {
    const validatedAccount = await Schemas.validadeAccount(request)
    await Account.create(validatedAccount)
    response.status(201)
    return {
      message: 'Account created!',
    }
  }

  public async login ({ request, auth }: HttpContextContract) {
    const {email, password} = request.body()
    const token = await auth.use('api').attempt(email, password,{
      expiresIn: '1 hour',
    })
    return {
      data: token.toJSON(),
    }
  }

  public async logout ({ auth }: HttpContextContract){
    await auth.use('api').revoke()
    return {
      revoked: true,
    }
  }
}
