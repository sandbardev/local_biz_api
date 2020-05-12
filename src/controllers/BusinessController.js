import connection from '../../knex/connection'
import cep_promise from 'cep-promise'
import * as jwt from 'jsonwebtoken'

const create = async (req, res) => {
  let { business_name, phone, social, cep, number } = req.body

  let data = await cep_promise(cep)
  .then((data) => data)
  .catch((err) => err) 
  
  if (!data.state) {
    return res.status(400).json({message: "CEP invalido. Por favor insira outro."})
  }
  let user = jwt.verify(req.headers.authorization, process.env.JWT_SECRET)

  let business = {
    business_name: business_name,
    phone: phone,
    social: social,
    
    cep: cep,
    state: data.state,
    city: data.city,
    neighborhood: data.neighborhood,
    street: data.street,
    number: number,

    owner_email: user.email
  }

  await connection('businesses').insert(business)
  return res.status(201).json()
}

const view = async (req, res) => {
  let { id } = req.params
  let business = await connection('businesses').where('id', id).select('*').first()

  if (!business){
    return res.status(404).json({message: "Business ID not found."})
  }
  
  return res.status(200).json(business)
}

const getByUser = async (req, res) => {
  let user = jwt.verify(req.headers.authorization, process.env.JWT_SECRET)

  let businesses = await connection('businesses')
  .where('owner_email', user.email)
  .select('*')

  return res.status(200).json(businesses)
}

const getByNeighborhood = async (req, res) => {
  let { city, neighborhood } = req.params

  let businesses = await connection('businesses')
  .where('city', city)
  .andWhere('neighborhood', neighborhood)
  .select('*')
  return res.json({city, neighborhood, businesses})
}

export { create, view, getByUser, getByNeighborhood }
