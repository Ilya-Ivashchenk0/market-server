export class ApiError extends Error {
  status

  constructor(status: number, message: string) {
    super(message)
    this.status = status
  }

  static UnauthorizedError() {
    return new ApiError(401, 'Необходима авторизация!')
  }

  static BadRequestError(message: string) {
    return new ApiError(400, message)
  }

  static ForbiddenError(message: string) {
    return new ApiError(403, message)
  }

  static NotFoundError(message: string) {
    return new ApiError(404, message)
  }

  static IncorrectLinkError(message: string) {
    return new ApiError(400, message)
  }

  static LostRouteError(message: string) {
    return new ApiError(404, message)
  }
}