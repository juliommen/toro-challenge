export class UserAccount {
  private _cpf: string
  private _accountNumber: number

  constructor(cpf: string) {
    const isValidCpf = UserAccount.cpfValidator(cpf)
    if (isValidCpf) {
      this._cpf = cpf
    } else {
      throw new Error('Invalid CPF')
    }
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

  static cpfValidator(cpf: string): boolean {
    if (cpf && typeof cpf === 'string' && cpf.length === 11) {
      const doesTheCpfContainOnlyDigits = /^\d+$/.test(cpf)

      if (!doesTheCpfContainOnlyDigits) {
        return false
      }

      const firstDigit = cpf[0]
      let count = 0
      for (const digit of cpf) {
        if (firstDigit === digit) {
          count++
        }
      }
      if (count === 11) {
        return false
      }

      const firstValidator = [10, 9, 8, 7, 6, 5, 4, 3, 2]
      let fistCount = 0
      for (let i = 0; i < firstValidator.length; i++) {
        const multiplier = firstValidator[i]
        const cpfDigit = Number(cpf[i])
        fistCount = fistCount + cpfDigit * multiplier
      }

      const firstRest = (fistCount * 10) % 11 === 10 ? 0 : (fistCount * 10) % 11
      if (firstRest.toString() !== cpf[9]) {
        return false
      }

      const secondValidator = [11, 10, 9, 8, 7, 6, 5, 4, 3, 2]
      let secondCount = 0
      for (let i = 0; i < secondValidator.length; i++) {
        const multiplier = secondValidator[i]
        const cpfDigit = Number(cpf[i])
        secondCount = secondCount + cpfDigit * multiplier
      }

      const secondRest =
        (secondCount * 10) % 11 === 10 ? 0 : (secondCount * 10) % 11
      if (secondRest.toString() !== cpf[10]) {
        return false
      }

      return true
    } else {
      return false
    }
  }
}
