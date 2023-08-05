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

    const amount = investmentTransaction.price * investmentTransaction.quantity
    const userAccount =
      await UserAccountRepository.getInstance().findByAccountNumber(
        investmentTransaction.accountNumber,
      )

    userAccount.balance -= amount

    return { investmentTransaction, balance: userAccount.balance }
  }
}

let singletonInstance: TransactionsRepository | null = null
