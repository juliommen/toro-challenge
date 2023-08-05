import { UserAccountRepository } from '@/providers/database/in-memory/UserAccountRepository'
import { afterEach, beforeAll, beforeEach, describe, expect, it } from 'vitest'
import { UserAccount } from '../entities/UserAccount'
import { CreateTransferUseCase } from './create-transfer'
import { TransactionsRepository } from '@/providers/database/in-memory/TransactionsRepository'
import { TransferTransaction } from '../entities/TransferTransaction'
import { AppError } from '../errors/AppError'

const VALID_CPF = '36577946035'

let transactionsRepository: TransactionsRepository
let userAccountRepository: UserAccountRepository
let createTransferUseCase: CreateTransferUseCase

describe('Create transfer transaction integration tests', () => {
  beforeEach(() => {
    userAccountRepository = UserAccountRepository.getInstance()
    transactionsRepository = TransactionsRepository.getInstance()
    createTransferUseCase = new CreateTransferUseCase(
      transactionsRepository,
      userAccountRepository,
    )
  })

  afterEach(() => {
    UserAccountRepository.reset()
    TransactionsRepository.reset()
  })

  it('should be able to create a new transfer transaction', async () => {
    const userAccount = new UserAccount(VALID_CPF)
    userAccount.accountNumber = 1
    await userAccountRepository.create(userAccount)

    const validTransferTransactionData = {
      event: TransferTransaction.TRANSFER_TRANSACTION_EVENT,
      amount: 1000,
      target: {
        account: '1',
        bank: TransferTransaction.TARGET_BANK,
        branch: TransferTransaction.TARGET_BRANCH,
      },
      origin: { bank: '0002', branch: '353', cpf: VALID_CPF },
    }

    const transferTransaction = new TransferTransaction(
      validTransferTransactionData,
    )

    const createdTransfer = await createTransferUseCase.execute(
      transferTransaction,
    )

    expect(createdTransfer).toEqual(
      expect.objectContaining({
        _accountNumber: transferTransaction.accountNumber,
      }),
    )
    expect(userAccount).toEqual(
      expect.objectContaining({
        _balance: createdTransfer.amount,
      }),
    )
  })

  it('should not be able to create a new transfer for a non existing account', async () => {
    const validTransferTransactionData = {
      event: TransferTransaction.TRANSFER_TRANSACTION_EVENT,
      amount: 1000,
      target: {
        account: '2',
        bank: TransferTransaction.TARGET_BANK,
        branch: TransferTransaction.TARGET_BRANCH,
      },
      origin: { bank: '0002', branch: '353', cpf: VALID_CPF },
    }

    const transferTransaction = new TransferTransaction(
      validTransferTransactionData,
    )

    expect(async () => {
      const createdTransfer = await createTransferUseCase.execute(
        transferTransaction,
      )
    }).rejects.toThrowError(AppError)
  })
})
