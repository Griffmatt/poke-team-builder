const getAllUsersTeams = 'SELECT team.id, team.user_id, team_style, team_name, ARRAY_AGG(JSON_BUILD_OBJECT(\'id\', created_pokemon_id, \'name\', "name", \'pokemon_name\', pokemon_name)) as pokemon fROM team INNER JOIN pokemon_on_team ON team.id = pokemon_on_team.team_id INNER JOIN created_pokemon ON pokemon_on_team.created_pokemon_id = created_pokemon.id WHERE $1 = team.user_id GROUP BY team.id'
const getAllTeams = 'SELECT team.id, team.user_id, team_style, team_name, ARRAY_AGG(JSON_BUILD_OBJECT(\'id\', created_pokemon_id, \'name\', "name", \'pokemon_name\', pokemon_name)) as pokemon fROM team INNER JOIN pokemon_on_team ON team.id = pokemon_on_team.team_id INNER JOIN created_pokemon ON pokemon_on_team.created_pokemon_id = created_pokemon.id GROUP BY team.id'
const getTeam = 'SELECT team.id, team.user_id, team_style, team_name, ARRAY_AGG(JSON_BUILD_OBJECT(\'id\', created_pokemon_id, \'name\', "name", \'pokemon_name\', pokemon_name)) as pokemon fROM team INNER JOIN pokemon_on_team ON team.id = pokemon_on_team.team_id INNER JOIN created_pokemon ON pokemon_on_team.created_pokemon_id = created_pokemon.id  WHERE team.id = $1 GROUP BY team.id'

const deleteTeam = 'DELETE FROM team WHERE $1 = "id"'

module.exports = {
  getAllUsersTeams,
  getAllTeams,
  getTeam,
  deleteTeam
}
