import { HttpResponse, HttpResquest } from '../protocols/http'
import { MissingParamError, InvalidParamError } from '../errors'
import { badRequest, goodRequest, serverError } from '../helpers/http-helper'
import { Controller } from '../protocols/controller'
import { EmailValidator } from '../protocols/email-validator'
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
      const isValid = this.emailValidator.isValid(httpRequest.body.email)
      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }
      return goodRequest()

    } catch (error) {
      return  serverError()
    }
  }
}
