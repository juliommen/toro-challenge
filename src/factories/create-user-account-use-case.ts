import { UserAccountRepository } from '@/providers/database/dynamodb/UserAccountRepository'
import { CreateUserAccountUseCase } from '@/domain/use-cases/create-user-account'

export function makeCreateUserAccountUseCase() {
  const usersAccountRepository = new UserAccountRepository()
  const createUserAccountUseCase = new CreateUserAccountUseCase(
    usersAccountRepository,
  )

  return createUserAccountUseCase
}
