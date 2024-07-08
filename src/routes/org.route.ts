import {Router} from 'express'
import * as orgController from '../controllers/org.controller'
import {authMiddleware} from '../middlewares/auth.middleware'

const router =  Router()

router.post('/:orgId/users',authMiddleware, orgController.addUsersToOrg)

router.post('/',authMiddleware,  orgController.createOrg)

router.get('/', authMiddleware,orgController.getAllUsersOrg)

router.get('/:orgId', authMiddleware, orgController.getOrgByID)


export default router
