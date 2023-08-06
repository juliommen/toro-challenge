import { Request, Response } from 'express'
import { ICreateTransferDTO } from '../dtos/ICreateTransferDTO'
import { TransferTransaction } from '@/domain/entities/TransferTransaction'
import { makeTransferUseCase } from '@/factories/create-transfer-use-case'

export async function createTransferController(req: Request, res: Response) {
  const data = req.body as ICreateTransferDTO

  const transfTransaction = new TransferTransaction(data)

  const createTransferUseCase = makeTransferUseCase()

  const transferTransaction = await createTransferUseCase.execute(
    transfTransaction,
  )

  return res.status(201).json({ transferTransaction })
}
