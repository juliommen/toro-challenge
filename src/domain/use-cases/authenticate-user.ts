import { AppError } from '../errors/AppError'
import { IUserAccountRepository } from '../interfaces/IUserAccountRepository'

export class AuthenticateUserUseCase {
  constructor(private userAccountRepository: IUserAccountRepository) {}

  async execute(cpf: string) {
    const account = await this.userAccountRepository.findByCpf(cpf)
    if (!account) {
      throw new AppError('Invalid credentials')
    }
    return account
  }
}
