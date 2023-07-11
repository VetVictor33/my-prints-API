import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema,rules } from '@ioc:Adonis/Core/Validator'

export default abstract class Schemas {
  private static account = schema.create({
    username: schema.string({ trim: true }),
    email: schema.string({ trim: true }, [
      rules.email(),
    ]),
    password: schema.string({ trim: true }, [
      rules.minLength(6),
    ]),
  })

  private static print = schema.create({
    title: schema.string({trim:true}),
    description: schema.string({trim:true}),
    image: schema.file({
      size: '5mb',
      extnames: ['jpg', 'png'],
    }),
  })

  public static async validadeAccount (request: HttpContextContract['request']) {
    const validatedAccount = await request.validate({
      schema: this.account,
      messages: {
        'username.required': 'Please inform an username',
        'email.required': 'Please inform an email',
        'email.email': 'Plese inform formated email',
        'password.required': 'Please informa a password',
        'password.minLength': 'Password most have at least 6 characteres',
      },
    })
    return validatedAccount
  }

  public static async validatePrint (request: HttpContextContract['request']) {
    const validatedPrint = await request.validate({
      schema: this.print,
      messages: {
        'title.required': 'Please inform a title',
        'image.required': 'Please upoad a image',
        'description.email': 'Plese inform a description',
      },
    })
    return validatedPrint
  }
}
