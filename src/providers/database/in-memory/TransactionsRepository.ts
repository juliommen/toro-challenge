import { InvestmentTransaction } from '@/domain/entities/InvestmentTransaction'
import { TransferTransaction } from '@/domain/entities/TransferTransaction'
import { ITransactionsRepository } from '@/domain/interfaces/ITransactionsRepository'
import { UserAccountRepository } from './UserAccountRepository'

export class TransactionsRepository implements ITransactionsRepository {
  private transactions: (InvestmentTransaction | TransferTransaction)[]

  private constructor() {
    this.transactions = []
  }

  static getInstance() {
    if (!singletonInstance) {
      singletonInstance = new TransactionsRepository()
    }
    return singletonInstance
  }

  static reset() {
    singletonInstance = null
  }

  async createTransfer(transferTransaction: TransferTransaction) {
    this.transactions.push(transferTransaction)

    const userAccount =
      await UserAccountRepository.getInstance().findByAccountNumber(
        transferTransaction.accountNumber,
      )

    userAccount.balance += transferTransaction.amount

    return transferTransaction
  }

  async createInvestment(investmentTransaction: InvestmentTransaction) {
    this.transactions.push(investmentTransaction)

    return investmentTransaction
  }
}

let singletonInstance: TransactionsRepository | null = null
