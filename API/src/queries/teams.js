const getAllUsersTeams = `SELECT team.id, team.user_id, team_style, team_name, created_pokemon_id, "name", pokemon_id fROM team INNER JOIN pokemon_on_team ON team.id = pokemon_on_team.team_id INNER JOIN created_pokemon ON pokemon_on_team.created_pokemon_id = created_pokemon.id WHERE $1 = team.user_id`
const getAllTeams = `SELECT team.id, team.user_id, team_style, team_name, created_pokemon_id, "name", pokemon_id fROM team INNER JOIN pokemon_on_team ON team.id = pokemon_on_team.team_id INNER JOIN created_pokemon ON pokemon_on_team.created_pokemon_id = created_pokemon.id`
const getTeam = "SELECT pokemon_id FROM pokemon_on_team WHERE $1 = team_id"

const deleteTeam = `DELETE FROM team WHERE $1 = "id"`

module.exports = {
    getAllUsersTeams,
    getAllTeams,
    getTeam,
    deleteTeam
}