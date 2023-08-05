/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, expect, it } from 'vitest'
import { TransferTransacition } from './TransferTransaction'
import { DomainError } from '../errors/DomainError'

const VALID_CPF = '36577946035'

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

    expect(() => {
      const transferTransaction = new TransferTransacition({
        ...validTransferTransactionData,
        amount: undefined as any,
      })
    }).toThrowError(DomainError)

    expect(() => {
      const transferTransaction = new TransferTransacition({
        ...validTransferTransactionData,
        amount: 0 as any,
      })
    }).toThrowError(DomainError)
  })

  it('should not be able to create a new transfer transaction with invalid event', async () => {
    const validTransferTransactionData = {
      amount: 1000,
      origin: undefined as any,
      target: undefined as any,
    }

    expect(() => {
      const transferTransaction = new TransferTransacition({
        ...validTransferTransactionData,
        event: undefined as any,
      })
    }).toThrowError(DomainError)

    expect(() => {
      const transferTransaction = new TransferTransacition({
        ...validTransferTransactionData,
        event: 'TEST' as any,
      })
    }).toThrowError(DomainError)
  })

  it('should not be able to create a new transfer transaction with invalid origin', async () => {
    expect(() => {
      const transferTransaction = new TransferTransacition({
        ...validTransferTransactionData,
        origin: undefined as any,
      })
    }).toThrowError(DomainError)
  })

  it('should not be able to create a new transfer transaction with invalid origin bank', async () => {
    expect(() => {
      const transferTransaction = new TransferTransacition({
        ...validTransferTransactionData,
        origin: { bank: undefined as any, branch: '1', cpf: VALID_CPF },
      })
    }).toThrowError(DomainError)
  })

  it('should not be able to create a new transfer transaction with invalid origin branch', async () => {
    expect(() => {
      const transferTransaction = new TransferTransacition({
        ...validTransferTransactionData,
        origin: { bank: '1', branch: undefined as any, cpf: VALID_CPF },
      })
    }).toThrowError(DomainError)
  })

  it('should not be able to create a new transfer transaction with invalid origin cpf', async () => {
    expect(() => {
      const transferTransaction = new TransferTransacition({
        ...validTransferTransactionData,
        origin: { bank: '1', branch: '1', cpf: undefined as any },
      })
    }).toThrowError(DomainError)
  })

  it('should not be able to create a new transfer transaction with invalid target', async () => {
    expect(() => {
      const transferTransaction = new TransferTransacition({
        ...validTransferTransactionData,
        target: undefined as any,
      })
    }).toThrowError(DomainError)
  })

  it('should not be able to create a new transfer transaction with invalid target bank', async () => {
    expect(() => {
      const transferTransaction = new TransferTransacition({
        ...validTransferTransactionData,
        target: {
          bank: undefined as any,
          branch: TransferTransacition.TARGET_BRANCH,
          account: '1',
        },
      })
    }).toThrowError(DomainError)
  })

  it('should not be able to create a new transfer transaction with invalid target branch', async () => {
    expect(() => {
      const transferTransaction = new TransferTransacition({
        ...validTransferTransactionData,
        target: {
          bank: TransferTransacition.TARGET_BANK,
          branch: undefined as any,
          account: '1',
        },
      })
    }).toThrowError(DomainError)
  })

  it('should not be able to create a new transfer transaction with invalid target account', async () => {
    expect(() => {
      const transferTransaction = new TransferTransacition({
        ...validTransferTransactionData,
        target: {
          bank: TransferTransacition.TARGET_BANK,
          branch: TransferTransacition.TARGET_BRANCH,
          account: undefined as any,
        },
      })
    }).toThrowError(DomainError)
  })
})
