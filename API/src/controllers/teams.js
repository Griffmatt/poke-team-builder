const pool = require("../db");
const queries = require("../queries/teams");

const formatTeamData = (teams) => {
  const pokemonMap = new Map();
  const pokeArr = [];
  teams.forEach((team) => {
    const key = pokemonMap.get(team.id) ?? [];
    pokemonMap.set(team.id, {
      user_id: team.user_id,
      team_name: team.team_name,
      team_style: team.team_style,
      team_id: team.id,
      pokemon: [
        ...(key.pokemon ?? []),
        {
          name: team.name,
          pokemon_id: team.pokemon_id,
          created_pokemon_id: team.created_pokemon_id,
        },
      ],
    });
  });

  pokemonMap.forEach((pokemon) => {
    pokeArr.push(pokemon);
  });

  return pokeArr
};

const getAllUsersTeams = (req, res) => {
  const userId = parseInt(req.params.userId);
  pool.query(queries.getAllUsersTeams, [userId], (error, results) => {
    if (error) throw error;
    const pokeArr = formatTeamData(results.rows);
    res.status(200).json(pokeArr);
  });
};

const getAllTeams = (req, res) => {
  pool.query(queries.getAllTeams, (error, results) => {
    if (error) throw error;
    const pokeArr = formatTeamData(results.rows);
    res.status(200).json(pokeArr);
  });
};

const getTeam = (req, res) => {
  const id = parseInt(req.params.id);
  pool.query(queries.getTeam, id, (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

const postTeam = (req, res) => {
  const { user_id, pokemon_ids, team_name, team_style } = req.body;

  pool.query(
    `
        WITH team AS (INSERT INTO team (user_id, team_style, team_name) VALUES (${user_id}, '${team_style}', '${team_name}') RETURNING id)

        INSERT INTO pokemon_on_team VALUES (${pokemon_ids[0]}, (SELECT id FROM team)),(${pokemon_ids[1]}, (SELECT id FROM team)), (${pokemon_ids[2]}, (SELECT id FROM team)), (${pokemon_ids[3]}, (SELECT id FROM team)), (${pokemon_ids[4]}, (SELECT id FROM team)), (${pokemon_ids[5]}, (SELECT id FROM team));
    `,

    (error) => {
      if (error) {
        throw error;
      }
      res.status(200).json(req.body);
    }
  );
};

const deleteTeam = (req, res) => {
  const teamId = parseInt(req.body.teamId);
  pool.query(queries.deleteTeam, [teamId], (error) => {
    if (error) {
      throw error;
    }
    res.status(200).json(req.body);
  });
};

module.exports = {
  getAllTeams,
  getAllUsersTeams,
  getTeam,
  postTeam,
  deleteTeam,
};
