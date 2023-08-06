import { Request, Response } from 'express'
import { ICreateInvestmentDTO } from '../dtos/ICreateInvestmentDTO'
import { InvestmentTransaction } from '@/domain/entities/InvestmentTransaction'
import { makeInvestmentUseCase } from '@/factories/create-investment-use-case'

export async function createInvestmentController(req: Request, res: Response) {
  const data = req.body as ICreateInvestmentDTO

  const investTransaction = new InvestmentTransaction(data)

  const createInvestmentUseCase = makeInvestmentUseCase()

  const { investmentTransaction, balance } =
    await createInvestmentUseCase.execute(investTransaction, data.cpf)

  return res.status(201).json({ investmentTransaction, balance })
}
