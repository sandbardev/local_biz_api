import connection from '../../knex/connection'
import * as jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const authorizeUser = async (req, res) => {
  let { email, password } = req.body

  let user = await connection('users').where('email', email).select('*').first()
  
  if (!user) {
    return res.status(404).json({error: 'User not found!'})
  }

  bcrypt.compare(password, user.password, async (err, result) => {
    if (result) {
      let user = await connection('users').where('email', email).select('id', 'name', 'surname', 'email').first()
      jwt.sign(user, process.env.JWT_SECRET, (err, token) => {
        if (err) {
          return res.status(500).json({err})
        }
        return res.status(202).json({token, user})
      })
    }
  })
}

export { authorizeUser }
