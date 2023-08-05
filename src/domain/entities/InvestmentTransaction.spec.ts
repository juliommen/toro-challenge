/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, expect, it } from 'vitest'
import { InvestmentTransacition } from './InvestmentTransaction'
import { DomainError } from '../errors/DomainError'

const validInvestmentTransactionData = {
  event: InvestmentTransacition.INVESTMENT_TRANSACTION_EVENT,
  stock: 'TEST',
  quantity: 100,
}

describe('Investment transaction unit tests', () => {
  it('should be able to create a new investment transaction', async () => {
    const investmentTransaction = new InvestmentTransacition(
      validInvestmentTransactionData,
    )

    expect(investmentTransaction).toEqual(
      expect.objectContaining({
        _event: validInvestmentTransactionData.event,
        _stock: validInvestmentTransactionData.stock,
        _quantity: validInvestmentTransactionData.quantity,
        _createdAt: expect.any(Number),
      }),
    )
  })

  it('should not be able to create a new investment transaction with invalid event', async () => {
    expect(() => {
      const investmentTransaction = new InvestmentTransacition({
        ...validInvestmentTransactionData,
        event: 'TEST',
      })
    }).toThrowError(DomainError)
  })

  it('should not be able to create a new investment transaction with invalid quantity', async () => {
    expect(() => {
      const investmentTransaction = new InvestmentTransacition({
        ...validInvestmentTransactionData,
        quantity: undefined,
      })
    }).toThrowError(DomainError)
  })

  it('should not be able to create a new investment transaction with invalid stock', async () => {
    expect(() => {
      const investmentTransaction = new InvestmentTransacition({
        ...validInvestmentTransactionData,
        stock: undefined,
      })
    }).toThrowError(DomainError)
  })

  it('should not be able to set a invalid account number to an investment transaction', async () => {
    const investmentTransaction = new InvestmentTransacition(
      validInvestmentTransactionData,
    )
    expect(() => {
      investmentTransaction.accountNumber = '1' as any
    }).toThrowError(DomainError)
  })

  it('should not be able to create a new investment transaction with invalid price', async () => {
    const investmentTransaction = new InvestmentTransacition(
      validInvestmentTransactionData,
    )
    expect(() => {
      investmentTransaction.price = '1' as any
    }).toThrowError(DomainError)
  })
})
