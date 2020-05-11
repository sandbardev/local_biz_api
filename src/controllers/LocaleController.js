import connection from '../../knex/connection'
import cep_promise from 'cep-promise'

const getCities = async (req, res) => {
  let cities = await connection('businesses').select('city').distinct()

  if (!cities[0]) {
    return res.status(404).json({error: "No businesses in this city!"})
  }

  return res.status(200).json(cities)
}

const getNeighborhoods = async (req, res) => {
  let { city } = req.params

  let neighborhoods = await connection('businesses').where('city', city).select('neighborhood').distinct()
  if (!neighborhoods[0]) {
    return res.status(404).json({error: "No businesses in this city!"})
  }
  return res.status(200).json(neighborhoods)
}

export { getCities, getNeighborhoods }
