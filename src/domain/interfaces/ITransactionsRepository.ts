import { InvestmentTransaction } from '../entities/InvestmentTransaction'
import { TransferTransaction } from '../entities/TransferTransaction'

interface CreateInvestmentResponse {
  investmentTransaction: InvestmentTransaction
  balance: number
}

export interface ITransactionsRepository {
  createTransfer(
    transferTransaction: TransferTransaction,
  ): Promise<TransferTransaction>
  createInvestment(
    investmentTransaction: InvestmentTransaction,
  ): Promise<CreateInvestmentResponse>
}
