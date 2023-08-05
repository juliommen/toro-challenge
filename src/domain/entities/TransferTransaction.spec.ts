/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, expect, it } from 'vitest'
import { TransferTransacition } from './TransferTransaction'

const VALID_CPF = '36577946035'
const EXPECTED_ERROR = 'Validation error: invalid transfer transaction'

const validTransferTransactionData = {
  event: TransferTransacition.TRANSFER_TRANSACTION_EVENT,
  amount: 1000,
  target: {
    account: '123456789',
    bank: TransferTransacition.TARGET_BANK,
    branch: TransferTransacition.TARGET_BRANCH,
  },
  origin: { bank: '0002', branch: '353', cpf: VALID_CPF },
}

describe('Transfer transaction unit tests', () => {
  it('should be able to create a new transfer transaction', async () => {
    const transferTransaction = new TransferTransacition(
      validTransferTransactionData,
    )

    expect(transferTransaction).toEqual(
      expect.objectContaining({
        _event: validTransferTransactionData.event,
        _amount: validTransferTransactionData.amount * 100,
        _target: validTransferTransactionData.target,
        _origin: validTransferTransactionData.origin,
        _createdAt: expect.any(Number),
      }),
    )
  })

  it('should not be able to create a new transfer transaction with invalid amount', async () => {
    const validTransferTransactionData = {
      event: undefined as any,
      origin: undefined as any,
      target: undefined as any,
    }

    const specificExpectedError = EXPECTED_ERROR + ' amount'

    expect(() => {
      const transferTransaction = new TransferTransacition({
        ...validTransferTransactionData,
        amount: undefined as any,
      })
    }).toThrowError(specificExpectedError)

    expect(() => {
      const transferTransaction = new TransferTransacition({
        ...validTransferTransactionData,
        amount: 0 as any,
      })
    }).toThrowError(specificExpectedError)
  })

  it('should not be able to create a new transfer transaction with invalid event', async () => {
    const validTransferTransactionData = {
      amount: 1000,
      origin: undefined as any,
      target: undefined as any,
    }

    const specificExpectedError = EXPECTED_ERROR + ' event'

    expect(() => {
      const transferTransaction = new TransferTransacition({
        ...validTransferTransactionData,
        event: undefined as any,
      })
    }).toThrowError(specificExpectedError)

    expect(() => {
      const transferTransaction = new TransferTransacition({
        ...validTransferTransactionData,
        event: 'TEST' as any,
      })
    }).toThrowError(specificExpectedError)
  })

  it('should not be able to create a new transfer transaction with invalid origin', async () => {
    const specificExpectedError = EXPECTED_ERROR + ' origin'

    expect(() => {
      const transferTransaction = new TransferTransacition({
        ...validTransferTransactionData,
        origin: undefined as any,
      })
    }).toThrowError(specificExpectedError)
  })

  it('should not be able to create a new transfer transaction with invalid origin bank', async () => {
    const specificExpectedError = EXPECTED_ERROR + ' origin.bank'

    expect(() => {
      const transferTransaction = new TransferTransacition({
        ...validTransferTransactionData,
        origin: { bank: undefined as any, branch: '1', cpf: VALID_CPF },
      })
    }).toThrowError(specificExpectedError)
  })

  it('should not be able to create a new transfer transaction with invalid origin branch', async () => {
    const specificExpectedError = EXPECTED_ERROR + ' origin.branch'

    expect(() => {
      const transferTransaction = new TransferTransacition({
        ...validTransferTransactionData,
        origin: { bank: '1', branch: undefined as any, cpf: VALID_CPF },
      })
    }).toThrowError(specificExpectedError)
  })

  it('should not be able to create a new transfer transaction with invalid origin cpf', async () => {
    const specificExpectedError = EXPECTED_ERROR + ' origin.cpf'

    expect(() => {
      const transferTransaction = new TransferTransacition({
        ...validTransferTransactionData,
        origin: { bank: '1', branch: '1', cpf: undefined as any },
      })
    }).toThrowError(specificExpectedError)
  })

  it('should not be able to create a new transfer transaction with invalid target', async () => {
    const specificExpectedError = EXPECTED_ERROR + ' target'

    expect(() => {
      const transferTransaction = new TransferTransacition({
        ...validTransferTransactionData,
        target: undefined as any,
      })
    }).toThrowError(specificExpectedError)
  })

  it('should not be able to create a new transfer transaction with invalid target bank', async () => {
    const specificExpectedError = EXPECTED_ERROR + ' target.bank'

    expect(() => {
      const transferTransaction = new TransferTransacition({
        ...validTransferTransactionData,
        target: {
          bank: undefined as any,
          branch: TransferTransacition.TARGET_BRANCH,
          account: '1',
        },
      })
    }).toThrowError(specificExpectedError)
  })

  it('should not be able to create a new transfer transaction with invalid target branch', async () => {
    const specificExpectedError = EXPECTED_ERROR + ' target.branch'

    expect(() => {
      const transferTransaction = new TransferTransacition({
        ...validTransferTransactionData,
        target: {
          bank: TransferTransacition.TARGET_BANK,
          branch: undefined as any,
          account: '1',
        },
      })
    }).toThrowError(specificExpectedError)
  })

  it('should not be able to create a new transfer transaction with invalid target account', async () => {
    const specificExpectedError = EXPECTED_ERROR + ' target.account'

    expect(() => {
      const transferTransaction = new TransferTransacition({
        ...validTransferTransactionData,
        target: {
          bank: TransferTransacition.TARGET_BANK,
          branch: TransferTransacition.TARGET_BRANCH,
          account: undefined as any,
        },
      })
    }).toThrowError(specificExpectedError)
  })
})
