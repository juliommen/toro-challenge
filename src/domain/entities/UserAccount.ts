import { ValidatorHelper } from './utils/ValidationHelper'

export class UserAccount {
  private readonly _cpf: string
  private _accountNumber: number

  constructor(cpf: string) {
    const isValidCpf = ValidatorHelper.checkCpfValidation(cpf)

    if (!isValidCpf) {
      throw new Error('Invalid CPF')
    }

    this._cpf = cpf
  }

  public get cpf(): string {
    return this._cpf
  }

  public get accountNumber(): number {
    return this._accountNumber
  }

  public set accountNumber(account: number) {
    this._accountNumber = account
  }
}
