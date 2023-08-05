import { DomainError } from '../errors/DomainError'
import { ValidatorHelper } from './utils/ValidationHelper'

export class UserAccount {
  private _cpf: string
  private _accountNumber: number
  private _balance: number
  private _createdAt: number

  constructor(cpf: string) {
    const validationResult = this.validateInput(cpf)

    if (validationResult) {
      throw new DomainError('user account', validationResult)
    }

    this._cpf = cpf
    this._balance = 0
    this._createdAt = new Date().getTime()
  }

  get cpf(): string {
    return this._cpf
  }

  get accountNumber(): number {
    return this._accountNumber
  }

  set accountNumber(accountNumber: number) {
    if (!ValidatorHelper.checkPositiveInteger(accountNumber)) {
      throw new DomainError('user account', 'number')
    }
    this._accountNumber = accountNumber
  }

  get balance(): number {
    return this._balance
  }

  set balance(balance: number) {
    if (!ValidatorHelper.checkPositiveInteger(balance)) {
      throw new DomainError('user account', 'balance')
    }
    this._balance = balance
  }

  get createdAt(): number {
    return this._createdAt
  }

  validateInput(cpf: string): string | null {
    if (!ValidatorHelper.checkCpfValidation(cpf)) {
      return 'cpf'
    }
    return null
  }
}
