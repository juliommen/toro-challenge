/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, expect, it } from 'vitest'
import { UserAccount } from './UserAccount'
import { DomainError } from '../errors/DomainError'

const VALID_CPF = '36577946035'

describe('User account unit tests', () => {
  it('should be able to create a new user account with a CPF', async () => {
    const userAccount = new UserAccount(VALID_CPF)
    expect(userAccount.cpf).toEqual(VALID_CPF)
  })

  it('should not be able to create a new user account with an invalid CPF', async () => {
    const invalidCpf = '3657794603'
    expect(() => {
      const userAccount = new UserAccount(invalidCpf)
    }).toThrowError(DomainError)
  })

  it('should be able to set an account number to a user account', async () => {
    const userAccount = new UserAccount(VALID_CPF)

    const accountNumber = 123456789
    userAccount.accountNumber = accountNumber

    expect(userAccount.accountNumber).toEqual(accountNumber)
  })

  it('should not be able to set an invalid account number to a user account', async () => {
    const userAccount = new UserAccount(VALID_CPF)

    const invalidAccountNumber = '123456789' as any

    expect(() => {
      userAccount.accountNumber = invalidAccountNumber
    }).toThrowError(DomainError)
  })

  it('should not be able to set an invalid balance to a user account', async () => {
    const userAccount = new UserAccount(VALID_CPF)

    const invalidBalance = -1

    expect(() => {
      userAccount.balance = invalidBalance
    }).toThrowError(DomainError)
  })

  it('should not be able to set an invalid create at stamp to a user account', async () => {
    const userAccount = new UserAccount(VALID_CPF)

    const invalidCreatedAt = -1

    expect(() => {
      userAccount.createdAt = invalidCreatedAt
    }).toThrowError(DomainError)
  })
})
