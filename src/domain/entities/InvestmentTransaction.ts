import { DomainError } from '../errors/DomainError'
import { ValidatorHelper } from './utils/ValidationHelper'

interface InvestmentTransactionProps {
  event: string
  stock: string
  quantity: number
}

export class InvestmentTransacition {
  static INVESTMENT_TRANSACTION_EVENT = 'INVESTMENT'

  private _event: string
  private _accountNumber: number
  private _stock: string
  private _price: number
  private _quantity: number
  private _createdAt: number

  constructor(props: InvestmentTransactionProps) {
    const validationResult = this.validateInput(props)

    if (validationResult) {
      throw new DomainError('investment transaction', validationResult)
    }

    this._event = props.event
    this._stock = props.stock
    this._quantity = props.quantity
    this._createdAt = new Date().getTime()
  }

  get stock() {
    return this._stock
  }

  set accountNumber(accountNumber: number) {
    if (!ValidatorHelper.checkPositiveInteger(accountNumber)) {
      throw new DomainError('investment transaction', 'accountNumber')
    }
    this._accountNumber = accountNumber
  }

  get accountNumber() {
    return this._accountNumber
  }

  get price() {
    return this._price
  }

  set price(price: number) {
    if (!ValidatorHelper.checkPositiveInteger(price)) {
      throw new DomainError('investment transaction', 'price')
    }
    this._price = price
  }

  get quantity() {
    return this._quantity
  }

  get event() {
    return this._event
  }

  get createdAt() {
    return this._createdAt
  }

  private validateInput({
    event,
    stock,
    quantity,
  }: InvestmentTransactionProps): string | null {
    if (event !== InvestmentTransacition.INVESTMENT_TRANSACTION_EVENT) {
      return 'event'
    }
    if (!ValidatorHelper.checkPositiveInteger(quantity)) {
      return 'quantity'
    }
    if (typeof stock !== 'string') {
      return 'stock'
    }

    return null
  }
}
