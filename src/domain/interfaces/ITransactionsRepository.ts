import { InvestmentTransacition } from '../entities/InvestmentTransaction'
import { TransferTransacition } from '../entities/TransferTransaction'

export interface ITransactionsRepository {
  createTransfer(
    transferTransaction: TransferTransacition,
  ): Promise<TransferTransacition>
  createInvestment(
    investmentTransaction: InvestmentTransacition,
  ): Promise<InvestmentTransacition>
  getBalance(accountNumber: number): Promise<number>
}
