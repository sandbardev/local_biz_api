import { Router } from 'express'
import * as UserController from './controllers/UserController'
const router = Router()

import * as swaggerDocument from '../swagger.json'
import * as swaggerUi from 'swagger-ui-express'

router.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

router.get('/', async function (req, res) {
    return res.status(200).send("HOME\n")
})

router.post('/register', UserController.create)
export default router
