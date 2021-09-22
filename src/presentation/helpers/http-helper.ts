import { ServerError } from '../errors/server-error'
import {HttpResponse} from '../protocols/http'

export const serverError = ():HttpResponse => ({
    statusCode: 500, 
    body: new ServerError()
})

export const badRequest = (error: Error):HttpResponse => ({
    statusCode: 400, 
    body: error
})

export const goodRequest = ():HttpResponse => ({
    statusCode: 200, 
    body: 'succes'
})