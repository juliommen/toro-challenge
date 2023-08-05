import { DomainError } from '../errors/DomainError'
import { ValidatorHelper } from './utils/ValidationHelper'

interface StockProps {
  name: string
  price: number
}

export class Stock {
  private _name: string
  private _price: number

  constructor(props: StockProps) {
    const validationResult = this.validateInput(props)

    if (validationResult) {
      throw new DomainError('stock', validationResult)
    }

    this._name = props.name
    this._price = props.price
  }

  get name(): string {
    return this._name
  }

  get price(): number {
    return this._price
  }

  private validateInput({ price, name }: StockProps): string | null {
    if (!ValidatorHelper.checkPositiveInteger(price)) {
      return 'price'
    }
    if (typeof name !== 'string' || name.length <= 3) {
      return 'name'
    }

    return null
  }
}
