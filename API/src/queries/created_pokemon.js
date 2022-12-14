const getAllUsersPokemon = 'SELECT * FROM created_pokemon WHERE $1 = user_id'
const getAllCreatedPokemon = 'SELECT * FROM created_pokemon'
const getPokemon = `WITH stats_added AS (SELECT created_pokemon.*, JSON_OBJECT_AGG(stat, "value") as stats FROM created_pokemon INNER JOIN pokemon_stats ON created_pokemon.id = pokemon_stats.pokemon_id  WHERE $1 = id GROUP BY "id"),
moves as (SELECT pokemon_id, ARRAY_AGG("move") as moves FROM pokemon_moves WHERE $1 = pokemon_id GROUP BY pokemon_id)
SELECT stats_added.*, moves FROM stats_added INNER JOIN moves  ON stats_added.id = moves.pokemon_id;`
const getAllPokemonOnTeam = 'SELECT created_pokemon.pokemon_name, array_agg(pokemon_on_team.team_id) as teams FROM created_pokemon INNER JOIN pokemon_on_team ON created_pokemon.id = pokemon_on_team.created_pokemon_id GROUP BY "id"'

module.exports = {
  getAllUsersPokemon,
  getPokemon,
  getAllCreatedPokemon,
  getAllPokemonOnTeam
}
