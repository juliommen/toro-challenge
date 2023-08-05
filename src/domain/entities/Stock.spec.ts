/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, expect, it } from 'vitest'
import { Stock } from './Stock'

const validStockData = {
  name: 'TEST',
  price: 4000,
}

describe('Stock unit tests', () => {
  it('should be able to create a new stock', async () => {
    const stock = new Stock(validStockData)

    expect(stock).toEqual(
      expect.objectContaining({
        _name: validStockData.name,
        _price: validStockData.price,
      }),
    )
  })

  it('should not be able to create a new stock with invalid price', async () => {
    const EXPECTED_ERROR = 'Validation error: invalid stock price'

    expect(() => {
      const stock = new Stock({
        ...validStockData,
        price: undefined,
      })
    }).toThrowError(EXPECTED_ERROR)
  })

  it('should not be able to create a new stock with invalid name', async () => {
    const EXPECTED_ERROR = 'Validation error: invalid stock name'

    expect(() => {
      const stock = new Stock({
        ...validStockData,
        name: undefined,
      })
    }).toThrowError(EXPECTED_ERROR)
  })
})
