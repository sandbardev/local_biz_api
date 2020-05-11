import { Router } from 'express'
import * as UserController from './controllers/UserController'
import * as LoginController from './controllers/LoginController'
import * as BusinessController from './controllers/BusinessController'

import checkUserAuth from './middlewares/checkUserAuth'

import * as swaggerDocument from '../swagger.json'
import * as swaggerUi from 'swagger-ui-express'

const router = Router()

router.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

router.get('/', async function (req, res) {
    return res.status(200).json("HOME")
})

router.post('/register', UserController.create)
router.get('/users/:id', checkUserAuth, UserController.view)
router.delete('/users/:id', checkUserAuth, UserController.destroy)

router.post('/business/new', checkUserAuth, BusinessController.create)
router.get('/users/:id/businesses', checkUserAuth, BusinessController.getByUser)
router.get('/:city/:neighborhood', BusinessController.getByNeighborhood)
router.post('/login', LoginController.authorizeUser)

export default router
