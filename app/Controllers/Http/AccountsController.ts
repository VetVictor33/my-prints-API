import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Account from 'App/Models/Account'
import Hash from '@ioc:Adonis/Core/Hash'

export default class AccountsController {
  public async store ({ request, response }: HttpContextContract) {
    const { username, email, password } = request.body()
    const encryptedPassword = await Hash.make(password)
    await Account.create({ username, email, password: encryptedPassword })
    response.status(201)
    return {
      message: 'Account created!',
    }
  }
}
