import { Stock } from '@/domain/entities/Stock'
import { IStockRepository } from '@/domain/interfaces/IStockRepository'

export class StockRepository implements IStockRepository {
  private stocks: Stock[]

  private constructor() {
    this.stocks = [new Stock({ name: 'PETR4', price: 4000 })]
  }

  static getInstance(): StockRepository {
    if (!singletonInstance) {
      singletonInstance = new StockRepository()
    }
    return singletonInstance
  }

  async findByName(name: string) {
    const stock = this.stocks.find((stock) => stock.name === name)
    return stock
  }
}

let singletonInstance: StockRepository | null = null
