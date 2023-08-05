import { UserAccountRepository } from '@/providers/database/in-memory/UserAccountRepository'
import { afterEach, beforeAll, beforeEach, describe, expect, it } from 'vitest'
import { UserAccount } from '../entities/UserAccount'
import { CreateUserAccountUseCase } from './create-user-account'
import { AppError } from '../errors/AppError'

const VALID_CPF = '36577946035'
const VALID_CPF_2 = '89186073001'

let userAccountRepository: UserAccountRepository
let userAccountUserCase: CreateUserAccountUseCase

describe('Create user account integration tests', () => {
  beforeEach(() => {
    userAccountRepository = UserAccountRepository.getInstance()
    userAccountUserCase = new CreateUserAccountUseCase(userAccountRepository)
  })

  afterEach(() => {
    UserAccountRepository.reset()
  })

  it('should be able to create a new user account', async () => {
    const newUserAccount = new UserAccount(VALID_CPF)
    const createdUserAccount = await userAccountUserCase.execute(newUserAccount)

    expect(createdUserAccount).toEqual({
      _cpf: newUserAccount.cpf,
      _createdAt: expect.any(Number),
      _accountNumber: 1,
      _balance: 0,
    })
  })

  it('should not be able to create a new user account with the same cpf', async () => {
    const userAccount = new UserAccount(VALID_CPF)
    await userAccountUserCase.execute(userAccount)

    const newUserAccount = new UserAccount(VALID_CPF)

    expect(
      async () => await userAccountUserCase.execute(newUserAccount),
    ).rejects.toThrowError(AppError)
  })

  it('should be able to create a new user account with incremented account number', async () => {
    const userAccount = new UserAccount(VALID_CPF)
    await userAccountUserCase.execute(userAccount)

    const newUserAccount = new UserAccount(VALID_CPF_2)
    const createdUserAccount = await userAccountUserCase.execute(newUserAccount)

    expect(createdUserAccount).toEqual({
      _cpf: newUserAccount.cpf,
      _createdAt: expect.any(Number),
      _accountNumber: 2,
      _balance: 0,
    })
  })
})
