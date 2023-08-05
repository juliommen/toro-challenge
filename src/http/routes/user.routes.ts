import { Router } from 'express'
import { createUserAccountController } from '../controllers/create-user-account'

export const userRoutes = Router()

userRoutes.post('/account', createUserAccountController)
