import connection from '../../knex/connection'

const create = async (req, res) => {
  return res.status(200).json('yas')
}

export { create }