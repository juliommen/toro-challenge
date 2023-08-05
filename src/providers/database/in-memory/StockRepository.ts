import { Stock } from '@/domain/entities/Stock'
import { IStockRepository } from '@/domain/interfaces/IStockRepository'

export class StockRepository implements IStockRepository {
  private stocks: Stock[]

  constructor() {
    this.stocks = [new Stock({ name: 'PETR4', price: 4000 })]
  }

  async findByName(name: string) {
    const stock = this.stocks.find((stock) => stock.name === name)
    return stock
  }
}
