// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import User from "App/Models/User";

export default class  AuthController {

  async redirectToProvider ({ally}) {
    await ally.use('google').redirect()
  }

  async handleProviderCallback ({ally, auth, response}) {
    const google = ally.use('google')

    if (google.accessDenied()) {
      return 'Access was denied'
    }
    if (google.stateMisMatch()) {
      return 'Request expired. Retry again'
    }
    if (google.hasError()) {
      return google.getError()
    }
    /**
     * Finally, access the user
     */
    const googleUser = await google.user()
    let user = await User.query().where({email: googleUser.email}).first()
    if (!user){
      user = await User.create({
        name : googleUser.name,
        avatar: googleUser.avatarUrl,
        username: googleUser.original.given_name,
        email: googleUser.email,
        providerId: googleUser.id,
        provider:'google',
      })
    }
    let token = await auth.use("api").login(user, {
      expiresIn: "10 days",
    })
    token = token.toJSON()
    response.redirect('http://localhost:8080/login?token='+JSON.stringify(token))
  }
}
