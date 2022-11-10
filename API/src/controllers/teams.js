const pool = require("../db")
const queries = require('../queries/teams')

const getAllUsersTeams= (req, res) => {
    const userId = parseInt(req.params.userId)
    pool.query(
        queries.getAllUsersTeams, [userId],
        (error, results) => {
        if(error) throw error
        res.status(200).json(results.rows)
    })
}

const getAllTeams= (req, res) => {
    pool.query(
        queries.getAllTeams,
        (error, results) => {
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
        WITH team AS (INSERT INTO team (user_id, team_style, team_name) VALUES (${user_id}, '${team_style}', '${team_name}') RETURNING id)

        INSERT INTO pokemon_on_team VALUES (${pokemon_ids[0]}, (SELECT id FROM team)),(${pokemon_ids[1]}, (SELECT id FROM team)), (${pokemon_ids[2]}, (SELECT id FROM team)), (${pokemon_ids[3]}, (SELECT id FROM team)), (${pokemon_ids[4]}, (SELECT id FROM team)), (${pokemon_ids[5]}, (SELECT id FROM team));
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
    getAllTeams,
    getAllUsersTeams,
    getTeam,
    postTeam,
}