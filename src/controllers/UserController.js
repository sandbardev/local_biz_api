import connection from '../../knex/connection'
import {uuid} from 'uuidv4'
import bcrypt from 'bcrypt'
import isEmpty from '../utils/isEmpty'
import validator from 'email-validator'

const saltRounds = 16

const create = async (req, res) => {
  let id = uuid()
  let data = req.body

  Object.keys(data).forEach(function(key){
    if (isEmpty(data[key])) {
      return res.status(400).json({error:`Campo obrigatório: ${key}`})
    }   
  })
  
  let { name, surname, email, password } = req.body

  if (!validator.validate(email)){
    return res.status(403).json({error:"Email inválido!"})
  }

  let duplicate = await connection('users').where('email', email).select('*').first()
  if (duplicate) {
    return res.status(403).json({error: "Email já cadastrado!"})
  }

  bcrypt.hash(password, saltRounds, async (err, hash) => {
    if (!err) {
      let user = {
        name: name,
        surname: surname,
        email: email,
        password: hash
      }
      await connection('users').insert(user)
      return res.status(201).json()
    }
    return res.status(500).json({'error': err})
  })
}

export { create }
