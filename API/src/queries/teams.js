const getAllUsersTeams = "SELECT t.team_id, t.team_style, t.user_id, p.pokemon_id FROM team t WHERE $1 = t.user_id LEFT JOIN pokemon_on_team p ON t.team_id = p.team_id"
const getTeam = "SELECT pokemon_id FROM pokemon_on_team WHERE $1 = team_id"

module.exports = {
    getAllUsersTeams,
    getTeam
}