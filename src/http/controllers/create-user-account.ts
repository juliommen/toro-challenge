import { Request, Response } from 'express'
import { ICreateUserAccountDTO } from '../dtos/ICreateUserAccountDTO'
import { UserAccount } from '@/domain/entities/UserAccount'
import { makeCreateUserAccountUseCase } from '@/factories/create-user-account-use-case'

export async function createUserAccountController(req: Request, res: Response) {
  const { cpf } = req.body as ICreateUserAccountDTO
  const userAccount = new UserAccount(cpf)

  const createUserAccountUseCase = makeCreateUserAccountUseCase()

  const createdAccount = await createUserAccountUseCase.execute(userAccount)

  return res.status(201).json({ createdAccount })
}
