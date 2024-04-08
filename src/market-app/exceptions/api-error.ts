class ApiError extends Error {
  status
  errors: Error[] | undefined

  constructor(status: number, message: string, errors?: Error[]) {
    super(message)
    this.status = status
    this.errors = errors
  }

  static UnauthorizedError() {
    return new ApiError(401, 'Необходима авторизация!')
  }

  static BadRequestError(message: string, errors: Error[] = []) {
    return new ApiError(400, message, errors)
  }

}

export default ApiError