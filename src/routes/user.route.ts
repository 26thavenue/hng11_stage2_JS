import {Router} from 'express'
import * as userController from '../controllers/user.controller'
import {authMiddleware} from '../middlewares/auth.middleware'

const router = Router()

router.get('/:id', authMiddleware, userController.getUserById)

export default router