import { ValidatorHelper } from './utils/ValidationHelper'

export class UserAccount {
  private _cpf: string
  private _accountNumber: number
  private _createdAt: number

  constructor(cpf: string) {
    const isValidCpf = ValidatorHelper.checkCpfValidation(cpf)

    if (!isValidCpf) {
      throw new Error('Validation error: invalid user account cpf')
    }

    this._cpf = cpf
    this._createdAt = new Date().getTime()
  }

  get cpf(): string {
    return this._cpf
  }

  get accountNumber(): number {
    return this._accountNumber
  }

  set accountNumber(account: number) {
    if (!ValidatorHelper.checkPositiveInteger(account)) {
      throw new Error('Validation error: invalid user account number')
    }
    this._accountNumber = account
  }

  get createdAt(): number {
    return this._createdAt
  }
}
