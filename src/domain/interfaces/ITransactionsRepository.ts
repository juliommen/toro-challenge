import { InvestmentTransacition } from '../entities/InvestmentTransaction'
import { TransferTransacition } from '../entities/TransferTransaction'

interface CreateInvestmentResponse {
  investmentTransaction: InvestmentTransacition
  balance: number
}

export interface ITransactionsRepository {
  createTransfer(
    transferTransaction: TransferTransacition,
  ): Promise<TransferTransacition>
  createInvestment(
    investmentTransaction: InvestmentTransacition,
  ): Promise<CreateInvestmentResponse>
}
