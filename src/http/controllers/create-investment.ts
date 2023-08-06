import { Request, Response } from 'express'
import { ICreateInvestmentDTO } from '../dtos/ICreateInvestmentDTO'
import { InvestmentTransaction } from '@/domain/entities/InvestmentTransaction'
import { makeInvestmentUseCase } from '@/factories/create-investment-use-case'
import { formatReponse } from '../utils/formatResponse'

export async function createInvestmentController(req: Request, res: Response) {
  const data = req.body as ICreateInvestmentDTO

  const investmentTransaction = new InvestmentTransaction(data)

  const createInvestmentUseCase = makeInvestmentUseCase()

  const response = await createInvestmentUseCase.execute(
    investmentTransaction,
    data.cpf,
  )

  const responseFormatted = formatReponse(response)

  return res.status(201).json(responseFormatted)
}
