import Drive from '@ioc:Adonis/Core/Drive'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Account from 'App/Models/Account'
import Print from 'App/Models/Print'
import Schemas from 'App/Schemas/Schemas'
import { v4 as uuidv4 } from 'uuid'

export default class PrintsController {
  public async index ({auth} : HttpContextContract) {
    const {id} = auth.user!
    const prints = await Print.query().where('account_id', '=', id)

    return {
      data: prints,
    }
  }

  public async store ({request, response, auth} : HttpContextContract) {
    const {id} = auth.user!
    const account = await Account.findOrFail(id)

    const {image: _, ...validatedSchema} = await Schemas.validatePrint(request)

    const imageFile = request.file('image')!

    const imageName = `${uuidv4()}.${imageFile.extname}`

    await imageFile.moveToDisk('prints', {name:imageName})
    const imageUrl = await Drive.getUrl(`/prints/${imageName}`)

    const print = new Print()
    print.fill({...validatedSchema, imageUrl })

    await account.related('prints').save(print)
    response.status(201)
    return {
      message: 'Print successfuly created',
    }
  }

  public async show ({request, auth} : HttpContextContract) {
    const {id: userId} = auth.user!
    const {id: printId} = request.params()

    const print = await Print.query().where('account_id', '=', userId).where('id', '=', printId).first()

    const imageUrl = await Drive.getUrl(`/prints/${print?.imageUrl}`)

    return { data: { prints: print, imageUrl } }
  }

  public async destroy ({request, response, auth} : HttpContextContract) {
    const {id: userId} = auth.user!
    const {id: printId} = request.params()

    await Print.query().delete().where('account_id', '=', userId).where('id', '=', printId)

    response.status(204)
    return
  }
}