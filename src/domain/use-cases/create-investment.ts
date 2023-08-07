import { InvestmentTransaction } from '../entities/InvestmentTransaction'
import { AppError } from '../errors/AppError'
import { IStockRepository } from '../interfaces/IStockRepository'
import { ITransactionsRepository } from '../interfaces/ITransactionsRepository'
import { IUserAccountRepository } from '../interfaces/IUserAccountRepository'

export class CreateInvestmentUseCase {
  constructor(
    private transactionsRepository: ITransactionsRepository,
    private stockRepository: IStockRepository,
    private userAccountRepository: IUserAccountRepository,
  ) {}

  async execute(investmentTransaction: InvestmentTransaction, cpf: string) {
    const userAccount = await this.userAccountRepository.findByCpf(cpf)
    if (!userAccount) {
      throw new AppError('Invalid credentials')
    }

    const stock = await this.stockRepository.findByName(
      investmentTransaction.stock,
    )
    if (!stock) {
      throw new AppError('Stock does not exist')
    }

    investmentTransaction.accountNumber = userAccount.accountNumber
    investmentTransaction.price = stock.price

    const investmentAmount =
      investmentTransaction.price * investmentTransaction.quantity

    const doesUserHasSufficientFunds = userAccount.balance >= investmentAmount

    if (!doesUserHasSufficientFunds) {
      throw new AppError('User does not have sufficient funds')
    }

    const investmentTransactionCreated =
      await this.transactionsRepository.createInvestment(investmentTransaction)

    const balance = userAccount.balance - investmentAmount

    return { investmentTransaction: investmentTransactionCreated, balance }
  }
}
