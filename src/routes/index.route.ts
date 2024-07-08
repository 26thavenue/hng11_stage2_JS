

import userController from './user.route'

import orgController from './org.route'

import { Router } from 'express'

const router = Router()



router.use('/users', userController)

router.use('/organisations', orgController)

export default router 