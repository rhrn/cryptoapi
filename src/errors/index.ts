export class CustomError extends Error {
  public type: string = 'CustomError'
}

export class NotFoundError extends CustomError {
  public statusCode: string = '404'

  public payload: any = {
    message: 'Not Found'
  }

  constructor (message: string = 'Not Found Error') {
    super(message)
  }
}

export class InternalServerError extends CustomError {
  public statusCode: string = '500'
  public name = 'BadRequestError'
  public payload: any

  constructor (message: string = 'Internal Server Error') {
    super(message)
    this.payload = {
      statusCode: this.statusCode,
      message
    }
  }
}

export class BadRequestError extends CustomError {
  public statusCode: string = '400'
  public name = 'BadRequestError'
  public payload: any

  constructor (payload: any, message: string = 'Bad Request Error') {
    super(message)
    this.payload = payload
  }
}
