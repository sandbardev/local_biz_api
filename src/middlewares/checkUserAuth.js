import * as jwt from 'jsonwebtoken'

const checkUserAuth = async (req, res, next) => {
  let token = req.headers.authorization

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err) => {
      if (err) {
        return res.status(403).json(err)
      }
    })
      next()
  } else {
    return res.status(403).json({error: 'Empty token.'})
  }
}

export default checkUserAuth
