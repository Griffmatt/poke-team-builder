const pool = require("../db")
const queries = require('../queries/teams')

const getAllUsersTeams= (req, res) => {
    const id = parseInt(req.params.id)
    pool.query(queries.getAllUsersTeams, (error, results) => {
        if(error) throw error
        res.status(200).json(results.rows)
    })
}

const getTeam = (req, res) => {
    const id = parseInt(req.params.id)
    pool.query(queries.getTeam, id, (error, results) => {
        if(error) throw error
        res.status(200).json(results.rows)
    })
}

const postTeam = (req, res) => {

    const { user_id, pokemon_ids, team_name, team_style } = req.body

    pool.query(
    `
        WITH team AS (INSERT INTO team (user_id, team_style, team_name) VALUES (${user_id}, '${team_name}', '${team_style}') RETURNING team_id)

        INSERT INTO pokemon_on_team VALUES (${pokemon_ids[0]}, (SELECT team_id FROM team)),(${pokemon_ids[1]}, (SELECT team_id FROM team)), (${pokemon_ids[2]}, (SELECT team_id FROM team)), (${pokemon_ids[3]}, (SELECT team_id FROM team)), (${pokemon_ids[4]}, (SELECT team_id FROM team)), (${pokemon_ids[5]}, (SELECT team_id FROM team));
    `,

    (error) => {
      if (error) {
        throw error
      }
      res.status(200).json(req.body)
    }
  ); 
}

module.exports = {
    getAllUsersTeams,
    getTeam,
    postTeam
}