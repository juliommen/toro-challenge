import { UserAccountRepository } from '@/providers/database/in-memory/UserAccountRepository'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { UserAccount } from '../entities/UserAccount'
import { TransactionsRepository } from '@/providers/database/in-memory/TransactionsRepository'
import { AppError } from '../errors/AppError'
import { StockRepository } from '@/providers/database/in-memory/StockRepository'
import { CreateInvestmentUseCase } from './create-investment'
import { InvestmentTransaction } from '../entities/InvestmentTransaction'

const VALID_CPF = '36577946035'

let stockRepository: StockRepository
let transactionsRepository: TransactionsRepository
let userAccountRepository: UserAccountRepository
let createInvestmentUseCase: CreateInvestmentUseCase

describe('Create investment transaction integration tests', () => {
  beforeEach(() => {
    stockRepository = StockRepository.getInstance()
    userAccountRepository = UserAccountRepository.getInstance()
    transactionsRepository = TransactionsRepository.getInstance()
    createInvestmentUseCase = new CreateInvestmentUseCase(
      transactionsRepository,
      stockRepository,
      userAccountRepository,
    )
  })

  afterEach(() => {
    StockRepository.reset()
    UserAccountRepository.reset()
    TransactionsRepository.reset()
  })

  it('should be able to create a new investment transaction', async () => {
    const userAccount = new UserAccount(VALID_CPF)
    userAccount.accountNumber = 1
    await userAccountRepository.create(userAccount)

    userAccount.balance = 400000

    const validInvestmentTransactionData = {
      event: InvestmentTransaction.INVESTMENT_TRANSACTION_EVENT,
      quantity: 100,
      stock: 'PETR4',
    }

    const investmentTransaction = new InvestmentTransaction(
      validInvestmentTransactionData,
    )

    const result = await createInvestmentUseCase.execute(
      investmentTransaction,
      userAccount.cpf,
    )

    expect(result).toEqual(
      expect.objectContaining({
        balance: 0,
        investmentTransaction: expect.any(Object),
      }),
    )
  })

  it('should not be able to create a new investment transaction with unexisting stock', async () => {
    const userAccount = new UserAccount(VALID_CPF)
    userAccount.accountNumber = 1
    await userAccountRepository.create(userAccount)

    const nonExistingStock = 'PETR1'

    const validInvestmentTransactionData = {
      event: InvestmentTransaction.INVESTMENT_TRANSACTION_EVENT,
      quantity: 100,
      stock: nonExistingStock,
    }

    const investmentTransaction = new InvestmentTransaction(
      validInvestmentTransactionData,
    )

    expect(async () => {
      const result = await createInvestmentUseCase.execute(
        investmentTransaction,
        userAccount.cpf,
      )
    }).rejects.toThrowError(AppError)
  })

  it('should not be able to create a new transfer with invalid credentials', async () => {
    const validInvestmentTransactionData = {
      event: InvestmentTransaction.INVESTMENT_TRANSACTION_EVENT,
      quantity: 100,
      stock: 'PETR4',
    }

    const investmentTransaction = new InvestmentTransaction(
      validInvestmentTransactionData,
    )

    const invalidCpf = '123456789'

    expect(async () => {
      const result = await createInvestmentUseCase.execute(
        investmentTransaction,
        invalidCpf,
      )
    }).rejects.toThrowError(AppError)
  })

  it('should not be able to create a new investment transaction with insufficient funds', async () => {
    const userAccount = new UserAccount(VALID_CPF)
    userAccount.accountNumber = 2
    await userAccountRepository.create(userAccount)

    const validInvestmentTransactionData = {
      event: InvestmentTransaction.INVESTMENT_TRANSACTION_EVENT,
      quantity: 100,
      stock: 'PETR4',
    }

    const investmentTransaction = new InvestmentTransaction(
      validInvestmentTransactionData,
    )

    expect(async () => {
      const result = await createInvestmentUseCase.execute(
        investmentTransaction,
        VALID_CPF,
      )
    }).rejects.toThrowError(AppError)
  })
})
