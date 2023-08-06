import { Request, Response } from 'express'
import { ICreateUserAccountDTO } from '../dtos/ICreateUserAccountDTO'
import { UserAccount } from '@/domain/entities/UserAccount'
import { makeCreateUserAccountUseCase } from '@/factories/create-user-account-use-case'
import { formatReponse } from '../utils/formatResponse'

export async function createUserAccountController(req: Request, res: Response) {
  const { cpf } = req.body as ICreateUserAccountDTO
  const userAccount = new UserAccount(cpf)

  const createUserAccountUseCase = makeCreateUserAccountUseCase()

  const response = await createUserAccountUseCase.execute(userAccount)

  const responseFormatted = formatReponse(response)

  return res.status(201).json({ createdAccount: responseFormatted })
}
