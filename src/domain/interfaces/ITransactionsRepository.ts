import { InvestmentTransaction } from '../entities/InvestmentTransaction'
import { TransferTransaction } from '../entities/TransferTransaction'

export interface ITransactionsRepository {
  createTransfer(
    transferTransaction: TransferTransaction,
  ): Promise<TransferTransaction>
  createInvestment(
    investmentTransaction: InvestmentTransaction,
  ): Promise<InvestmentTransaction>
}
