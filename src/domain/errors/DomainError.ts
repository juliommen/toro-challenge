export class DomainError {
  public readonly message: string
  public readonly statusCode: number

  constructor(className: string, value: string, statusCode = 400) {
    this.message = `Validation error: invalid ${className} ${value}`
    this.statusCode = statusCode
  }
}
