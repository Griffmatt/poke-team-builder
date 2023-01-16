const pool = require('../db')
const queries = require('../queries/teams')

const getAllUsersTeams = (req, res) => {
  const userId = parseInt(req.params.userId)
  pool.query(queries.getAllUsersTeams, [userId], (error, results) => {
    if (error) throw error
    res.status(200).json(results.rows)
  })
}

const getAllTeams = (req, res) => {
  pool.query(queries.getAllTeams, (error, results) => {
    if (error) throw error
    res.status(200).json(results.rows)
  })
}

const getTeam = (req, res) => {
  const teamId = parseInt(req.params.teamId)
  pool.query(queries.getTeam, [teamId], (error, results) => {
    if (error) throw error
    res.status(200).json(results.rows)
  })
}

const postTeam = (req, res) => {
  const { user_id, pokemon_ids, team_name, team_style } = req.body
  const id = req.id

  if (user_id !== id) {
    return res.sendStatus(401)
  }

  pool.query(
    `
        WITH team AS (INSERT INTO team (user_id, team_style, team_name) VALUES (${user_id}, '${team_style}', '${team_name}') RETURNING id)

        INSERT INTO pokemon_on_team VALUES (${pokemon_ids[0].created_pokemon_id}, (SELECT id FROM team)),(${pokemon_ids[1].created_pokemon_id}, (SELECT id FROM team)), (${pokemon_ids[2].created_pokemon_id}, (SELECT id FROM team)), (${pokemon_ids[3].created_pokemon_id}, (SELECT id FROM team)), (${pokemon_ids[4].created_pokemon_id}, (SELECT id FROM team)), (${pokemon_ids[5].created_pokemon_id}, (SELECT id FROM team)) RETURNING (SELECT id FROM team);
    `,

    (error, results) => {
      if (error) {
        throw error
      }
      res.status(200).json(results.rows)
    }
  )
}

const deleteTeam = (req, res) => {
  const teamId = req.body.teamId
  const user_id = req.body.userId
  const id = req.id
  if (user_id !== id) {
    console.log(teamId)
    return res.sendStatus(401)
  }
  pool.query(queries.deleteTeam, [teamId], (error) => {
    if (error) {
      throw error
    }
    res.status(200).json(req.body)
  })
}

module.exports = {
  getAllTeams,
  getAllUsersTeams,
  getTeam,
  postTeam,
  deleteTeam
}
