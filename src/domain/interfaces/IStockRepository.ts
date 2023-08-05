import { Stock } from '../entities/Stock'

export interface IStockRepository {
  findByName(name: string): Promise<Stock>
}
