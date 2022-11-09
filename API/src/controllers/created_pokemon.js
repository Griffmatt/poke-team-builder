const pool = require("../db");

const queries = require("../queries/created_pokemon");

const getAllCreatedPokemon = (req, res) => {
  pool.query(queries.getAllCreatedPokemon, (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

const getAllUsersPokemon = (req, res) => {
  const id = parseInt(req.params.userId);
  pool.query(queries.getAllUsersPokemon, [id], (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

const getPokemon = (req, res) => {
  const id = parseInt(req.params.id);
  pool.query(queries.getAllUsersPokemon, id, (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

const postPokemon = (req, res) => {
  const {
    userId,
    pokemonId,
    name,
    ability,
    nature,
    heldItem,
    firstMove,
    secondMove,
    thirdMove,
    fourthMove,
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
    WITH pokemon AS (INSERT INTO created_pokemon (user_id, pokemon_id, "name", ability, nature, held_item) VALUES (${userId}, ${pokemonId}, '${name}', '${ability}', '${nature}', '${heldItem}') RETURNING id), 
    
    stats AS (INSERT INTO pokemon_stats VALUES ((SELECT id FROM pokemon), 'hitpointsEv', ${hitpointsEv}), ((SELECT id FROM pokemon), 'attackEv', ${attackEv}), ((SELECT id FROM pokemon), 'defenseEv', ${defenseEv}), ((SELECT id FROM pokemon), 'specialAttackEv', ${specialAttackEv}), ((SELECT id FROM pokemon), 'specialDefenseEv', ${specialDefenseEv}), ((SELECT id FROM pokemon), 'speedEv', ${speedEv}), ((SELECT id FROM pokemon), 'hitpointsIv', ${hitpointsIv}), ((SELECT id FROM pokemon), 'attackIv', ${attackIv}), ((SELECT id FROM pokemon), 'defenseIv', ${defenseIv}), ((SELECT id FROM pokemon), 'specialAttackIv', ${specialAttackIv}), ((SELECT id FROM pokemon), 'specialDefenseIv', ${specialDefenseIv}), ((SELECT id FROM pokemon), 'speedIv', ${speedIv}))

    INSERT INTO pokemon_moves (pokemon_id, move) VALUES ((SELECT id FROM pokemon), '${firstMove}'), ((SELECT id FROM pokemon), '${secondMove}'), ((SELECT id FROM pokemon), '${thirdMove}'), ((SELECT id FROM pokemon), '${fourthMove}');
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
