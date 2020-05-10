import connection from '../../knex/connection'
import * as jwt from 'jsonwebtoken'

const checkUserAuth = async (req, res, next) => {
  let token = req.headers.authorization

  if (token) {
    try {
      let decoded = jwt.verify(token, process.env.JWT_SECRET)
      next()
    } catch (error) {
      return res.status(403).json({error})
    }
  } else {
    return res.status(403).json({error: 'Empty token.'})
  }
}

export default checkUserAuth
