import { UserAccount } from '../entities/UserAccount'
import { AppError } from '../errors/AppError'
import { IUserAccountRepository } from '../interfaces/IUserAccountRepository'

export class CreateUserAccountUseCase {
  constructor(private userAccountRepository: IUserAccountRepository) {}

  async execute(userAccount: UserAccount) {
    const account = await this.userAccountRepository.findByCpf(userAccount.cpf)
    if (account) {
      throw new AppError('Account already created with this cpf')
    }

    const lastAccountNumber =
      await this.userAccountRepository.findLastAccountNumber()

    userAccount.accountNumber = lastAccountNumber + 1

    const createdUserAccount = await this.userAccountRepository.create(
      userAccount,
    )
    return createdUserAccount
  }
}
