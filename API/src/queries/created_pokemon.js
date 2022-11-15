const getAllUsersPokemon = 'SELECT * FROM created_pokemon WHERE $1 = user_id'
const getAllCreatedPokemon = 'SELECT * FROM created_pokemon'
const getPokemon = 'SELECT * FROM product WHERE $1 = id'

module.exports = {
  getAllUsersPokemon,
  getPokemon,
  getAllCreatedPokemon
}
