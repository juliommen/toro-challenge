import { UserAccount } from '../entities/UserAccount'

export interface IUserAccountRepository {
  create(userAccount: UserAccount): Promise<UserAccount>
  findByAccountNumber(accountNumber: number): Promise<UserAccount>
  findByCpf(cpf: string): Promise<UserAccount>
  findLastAccountNumber(): Promise<number>
}
