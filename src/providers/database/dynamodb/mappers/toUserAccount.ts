import { UserAccount } from '@/domain/entities/UserAccount'

export interface IUserAccountOnDatabase {
  hash_key: number
  account_number: number
  cpf: string
  balance: number
  created_at: number
}

export function toUserAccount(input: IUserAccountOnDatabase) {
  const userAccount = new UserAccount(input.cpf)
  userAccount.accountNumber = input.account_number
  userAccount.balance = input.balance
  userAccount.createdAt = input.created_at

  return userAccount
}
