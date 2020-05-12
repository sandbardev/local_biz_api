import { Router } from 'express'
import * as UserController from './controllers/UserController'
import * as LoginController from './controllers/LoginController'
import * as BusinessController from './controllers/BusinessController'
import * as LocaleController from './controllers/LocaleController'
import * as swaggerDocument from '../swagger.json'
import * as swaggerUi from 'swagger-ui-express'
import checkUserAuth from './middlewares/checkUserAuth'

const router = Router()

router.get('/', async function (req, res) {
    return res.status(200).json("HOME")
})

router.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

router.post('/register', UserController.create)
router.post('/login', LoginController.authorizeUser)

router.get('/users/:id', checkUserAuth, UserController.view)
router.delete('/users/:id', checkUserAuth, UserController.destroy)
router.get('/users/:id/businesses', checkUserAuth, BusinessController.getByUser)
router.post('/users/:id/businesses/new', checkUserAuth, BusinessController.create)

router.get('/cities', LocaleController.getCities)
router.get('/:city/neighborhoods', LocaleController.getNeighborhoods)
router.get('/:city/:neighborhood', BusinessController.getByNeighborhood)
router.get('/:city/:neighborhood/:id', BusinessController.view)

export default router
