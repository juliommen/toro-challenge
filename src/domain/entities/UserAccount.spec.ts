/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, expect, it } from 'vitest'
import { UserAccount } from './UserAccount'

describe('User account unit tests', () => {
  it('should be able to create a new user account with a CPF', async () => {
    const cpf = '36577946035'
    const userAccount = new UserAccount(cpf)
    expect(userAccount.cpf).toEqual(cpf)
  })

  it('should be able to set an account number do a user account', async () => {
    const cpf = '36577946035'
    const userAccount = new UserAccount(cpf)

    const accountNumber = 123456789
    userAccount.accountNumber = accountNumber

    expect(userAccount.accountNumber).toEqual(accountNumber)
  })

  it('should not be able to create a new user account with an invalid CPF', async () => {
    expect(() => {
      const userAccount = new UserAccount('3657794603')
    }).toThrowError()
    expect(() => {
      const userAccount = new UserAccount('')
    }).toThrowError()
    expect(() => {
      const userAccount = new UserAccount(undefined)
    }).toThrowError()
    expect(() => {
      const userAccount = new UserAccount(null)
    }).toThrowError()
    expect(() => {
      const userAccount = new UserAccount([] as any)
    }).toThrowError()
    expect(() => {
      const userAccount = new UserAccount({} as any)
    }).toThrowError()
  })
})
