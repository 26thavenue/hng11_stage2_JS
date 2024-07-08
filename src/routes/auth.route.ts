import {Router} from 'express'
import * as authController from '../controllers/auth.controller'
import validateService,{ userSchema , loginSchema} from "../service/validate.service";
const router = Router()

router.post('/register',validateService(userSchema) ,authController.register)

router.post('/login',validateService(loginSchema) , authController.login)

export default router