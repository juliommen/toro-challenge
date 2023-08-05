import { DomainError } from '../errors/DomainError'
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

export class TransferTransaction {
  static TRANSFER_TRANSACTION_EVENT = 'TRANSFER'
  static TARGET_BANK = '352'
  static TARGET_BRANCH = '0001'

  private _event: string
  private _accountNumber: number
  private _origin: Origin
  private _amount: number
  private _createdAt: number

  constructor(props: TransferTransactionProps) {
    const validationResult = this.validateInput(props)

    if (validationResult) {
      throw new DomainError('transfer transaction', validationResult)
    }

    this._event = props.event
    this._amount = props.amount * 100
    this._accountNumber = Number(props.target.account)
    this._origin = props.origin
    this._createdAt = new Date().getTime()
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

  get accountNumber() {
    return this._accountNumber
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
    if (event !== TransferTransaction.TRANSFER_TRANSACTION_EVENT) {
      return 'event'
    }
    if (!origin) {
      return 'origin'
    }
    if (!ValidatorHelper.checkConvertionToPositiveInt(origin.bank)) {
      return 'origin.bank'
    }
    if (!ValidatorHelper.checkConvertionToPositiveInt(origin.branch)) {
      return 'origin.branch'
    }
    if (!ValidatorHelper.checkCpfValidation(origin.cpf)) {
      return 'origin.cpf'
    }
    if (!target) {
      return 'target'
    }
    if (!ValidatorHelper.checkConvertionToPositiveInt(target.account)) {
      return 'target.account'
    }
    if (target.bank !== TransferTransaction.TARGET_BANK) {
      return 'target.bank'
    }
    if (target.branch !== TransferTransaction.TARGET_BRANCH) {
      return 'target.branch'
    }
    return null
  }
}
