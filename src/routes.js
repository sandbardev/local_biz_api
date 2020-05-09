import { Router } from 'express'

const router = Router()

router.get('/', async function (req, res) {
    return res.status(200).json({"root": "/"})
})

export default router
