import { ValidatorHelper } from './utils/ValidationHelper'

interface Target {
  bank: string
  branch: string
  account: string
}

interface Origin {
  bank: string
  branch: string
  cpf: string
}

interface TransferTransactionProps {
  event: string
  target: Target
  origin: Origin
  amount: number
}

export class TransferTransacition {
  static TRANSFER_TRANSACTION_EVENT = 'TRANSFER'
  static TARGET_BANK = '352'
  static TARGET_BRANCH = '0001'

  private _event: string
  private _target: Target
  private _origin: Origin
  private _amount: number
  private _createdAt: number

  constructor(props: TransferTransactionProps) {
    const validationResult = this.validateInput(props)

    if (validationResult) {
      throw new Error(
        `Validation error: invalid transfer transaction ${validationResult}`,
      )
    }

    this._event = props.event
    this._amount = props.amount * 100
    this._target = props.target
    this._origin = props.origin
    this._createdAt = new Date().getTime()
  }

  get target() {
    return this._target
  }

  get origin() {
    return this._origin
  }

  get amount() {
    return this._amount
  }

  get event() {
    return this._event
  }

  get createdAt() {
    return this._createdAt
  }

  private validateInput({
    amount,
    event,
    origin,
    target,
  }: TransferTransactionProps): string | null {
    if (!ValidatorHelper.checkPositiveInteger(amount * 100)) {
      return 'amount'
    }
    if (event !== TransferTransacition.TRANSFER_TRANSACTION_EVENT) {
      return 'event'
    }
    if (!origin) {
      return 'origin'
    }
    if (!ValidatorHelper.checkConvertionToInteger(origin.bank)) {
      return 'origin.bank'
    }
    if (!ValidatorHelper.checkConvertionToInteger(origin.branch)) {
      return 'origin.branch'
    }
    if (!ValidatorHelper.checkCpfValidation(origin.cpf)) {
      return 'origin.cpf'
    }
    if (!target) {
      return 'target'
    }
    if (!ValidatorHelper.checkConvertionToInteger(target.account)) {
      return 'target.account'
    }
    if (target.bank !== TransferTransacition.TARGET_BANK) {
      return 'target.bank'
    }
    if (target.branch !== TransferTransacition.TARGET_BRANCH) {
      return 'target.branch'
    }
    return null
  }
}
