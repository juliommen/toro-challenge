import { Stock } from '@/domain/entities/Stock'
import { IStockRepository } from '@/domain/interfaces/IStockRepository'

export class StockRepository implements IStockRepository {
  private stocks: Stock[]

  constructor() {
    this.stocks = []
  }

  async findByName(name: string) {
    const stock = this.stocks.find((stock) => stock.name === name)
    return stock
  }
}
