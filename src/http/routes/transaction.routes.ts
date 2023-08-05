import { Router } from 'express'
import { createTransferController } from '../controllers/create-transfer'
import { createInvestmentController } from '../controllers/create-investment'

export const transactionRoutes = Router()

transactionRoutes.post('/transfer', createTransferController)

transactionRoutes.post('/investment', createInvestmentController)
