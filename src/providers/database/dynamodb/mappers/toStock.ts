import { Stock } from '@/domain/entities/Stock'

export interface IStockOnDatabase {
  stock_name: string
  price: number
}

export function toStock(input: IStockOnDatabase) {
  const stock = new Stock({ name: input.stock_name, price: input.price })

  return stock
}
