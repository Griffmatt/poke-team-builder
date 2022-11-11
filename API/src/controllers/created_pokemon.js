const pool = require("../db");

const queries = require("../queries/created_pokemon");

const getAllCreatedPokemon = (req, res) => {
  pool.query(queries.getAllCreatedPokemon, (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

const getAllUsersPokemon = (req, res) => {
  const userId = parseInt(req.params.userId);
  pool.query(queries.getAllUsersPokemon, [userId], (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

const getPokemon = (req, res) => {
  const userId = parseInt(req.params.userId);
  pool.query(queries.getAllUsersPokemon, [userId], (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

const postPokemon = (req, res) => {
  const {
    user_id,
    pokemon_id,
    name,
    ability,
    nature,
    heldItem,
    first_move,
    second_move,
    third_move,
    fourth_move,
    hitpointsEv,
    attackEv,
    defenseEv,
    specialAttackEv,
    specialDefenseEv,
    speedEv,
    hitpointsIv,
    attackIv,
    defenseIv,
    specialAttackIv,
    specialDefenseIv,
    speedIv,
  } = req.body;

  pool.query(
    `
    WITH pokemon AS (INSERT INTO created_pokemon (user_id, pokemon_id, "name", ability, nature, held_item) VALUES (${user_id}, ${pokemon_id}, '${name}', '${ability}', '${nature}', '${heldItem}') RETURNING id), 
    
    stats AS (INSERT INTO pokemon_stats (pokemon_id, stat, value) VALUES ((SELECT id FROM pokemon), 'hitpointsEv', ${hitpointsEv}), ((SELECT id FROM pokemon), 'attackEv', ${attackEv}), ((SELECT id FROM pokemon), 'defenseEv', ${defenseEv}), ((SELECT id FROM pokemon), 'specialAttackEv', ${specialAttackEv}), ((SELECT id FROM pokemon), 'specialDefenseEv', ${specialDefenseEv}), ((SELECT id FROM pokemon), 'speedEv', ${speedEv}), ((SELECT id FROM pokemon), 'hitpointsIv', ${hitpointsIv}), ((SELECT id FROM pokemon), 'attackIv', ${attackIv}), ((SELECT id FROM pokemon), 'defenseIv', ${defenseIv}), ((SELECT id FROM pokemon), 'specialAttackIv', ${specialAttackIv}), ((SELECT id FROM pokemon), 'specialDefenseIv', ${specialDefenseIv}), ((SELECT id FROM pokemon), 'speedIv', ${speedIv}))

    INSERT INTO pokemon_moves (pokemon_id, move) VALUES ((SELECT id FROM pokemon), '${first_move}'), ((SELECT id FROM pokemon), '${second_move}'), ((SELECT id FROM pokemon), '${third_move}'), ((SELECT id FROM pokemon), '${fourth_move}');
    `,

    (error) => {
      if (error) {
        throw error
      }
      res.status(200).json(req.body)
    }
  ); 
};

module.exports = {
  getAllUsersPokemon,
  getPokemon,
  getAllCreatedPokemon,
  postPokemon,
};
