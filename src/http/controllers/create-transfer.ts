import { Request, Response } from 'express'
import { ICreateTransferDTO } from '../dtos/ICreateTransferDTO'
import { TransferTransaction } from '@/domain/entities/TransferTransaction'
import { makeTransferUseCase } from '@/factories/create-transfer-use-case'
import { formatReponse } from '../utils/formatResponse'

export async function createTransferController(req: Request, res: Response) {
  const data = req.body as ICreateTransferDTO

  const transferTransaction = new TransferTransaction(data)

  const createTransferUseCase = makeTransferUseCase()

  const response = await createTransferUseCase.execute(transferTransaction)

  const responseFormatted = formatReponse(response)

  return res.status(201).json({ transferTransaction: responseFormatted })
}
