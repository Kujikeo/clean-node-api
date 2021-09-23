import { HttpResponse, HttpResquest, Controller, EmailValidator } from '../protocols'
import { MissingParamError, InvalidParamError } from '../errors'
import { badRequest, goodRequest, serverError } from '../helpers/http-helper'


export class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator

  constructor(email: EmailValidator) {
    this.emailValidator = email
  }

  handle(httpRequest: HttpResquest): HttpResponse {
    try {
      const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }
      const {email, password, passwordConfirmation} = httpRequest.body
      if(password !== passwordConfirmation){
        return badRequest(new InvalidParamError('passwordConfirmation'))
      }
      const isValid = this.emailValidator.isValid(email)
      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }
      return goodRequest()

    } catch (error) {
      return  serverError()
    }
  }
}
