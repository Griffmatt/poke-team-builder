const pool = require('../db')

const queries = require('../queries/created_pokemon')

const getAllCreatedPokemon = (req, res) => {
  pool.query(queries.getAllCreatedPokemon, (error, results) => {
    if (error) throw error
    res.status(200).json(results.rows)
  })
}

const getAllUsersPokemon = (req, res) => {
  const userId = parseInt(req.params.userId)
  pool.query(queries.getAllUsersPokemon, [userId], (error, results) => {
    if (error) throw error
    res.status(200).json(results.rows)
  })
}

const getPokemon = (req, res) => {
  const pokemonId = parseInt(req.params.pokemonId)
  pool.query(queries.getPokemon, [pokemonId], (error, results) => {
    if (error) throw error
    res.status(200).json(results.rows)
  })
}

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
    speedIv
  } = req.body

  pool.query(
    `
    WITH pokemon AS (INSERT INTO created_pokemon (user_id, pokemon_id, "name", ability, nature, held_item) VALUES (${user_id}, ${pokemon_id}, '${name}', '${ability}', '${nature}', '${heldItem}') RETURNING id), 
    
    stats AS (INSERT INTO pokemon_stats (pokemon_id, stat, value) VALUES ((SELECT id FROM pokemon), 'hitpointsEv', ${hitpointsEv}), ((SELECT id FROM pokemon), 'attackEv', ${attackEv}), ((SELECT id FROM pokemon), 'defenseEv', ${defenseEv}), ((SELECT id FROM pokemon), 'specialAttackEv', ${specialAttackEv}), ((SELECT id FROM pokemon), 'specialDefenseEv', ${specialDefenseEv}), ((SELECT id FROM pokemon), 'speedEv', ${speedEv}), ((SELECT id FROM pokemon), 'hitpointsIv', ${hitpointsIv}), ((SELECT id FROM pokemon), 'attackIv', ${attackIv}), ((SELECT id FROM pokemon), 'defenseIv', ${defenseIv}), ((SELECT id FROM pokemon), 'specialAttackIv', ${specialAttackIv}), ((SELECT id FROM pokemon), 'specialDefenseIv', ${specialDefenseIv}), ((SELECT id FROM pokemon), 'speedIv', ${speedIv}))

    INSERT INTO pokemon_moves (pokemon_id, move, move_order) VALUES ((SELECT id FROM pokemon), '${first_move}', 'first'), ((SELECT id FROM pokemon), '${second_move}', 'second'), ((SELECT id FROM pokemon), '${third_move}', 'third'), ((SELECT id FROM pokemon), '${fourth_move}', 'fourth');
    `,

    (error) => {
      if (error) {
        throw error
      }
      res.status(200).json(req.body)
    }
  )
}

const updatePokemon = (req, res) => {
  const pokemonId = parseInt(req.params.pokemonId)
  const {
    name,
    ability,
    nature,
    heldItem,
    moves,
    stats
  } = req.body

  pool.query(
    `
    WITH pokemon AS (UPDATE created_pokemon SET "name" = '${name}', ability = '${ability}', nature = '${nature}', held_item = '${heldItem}' WHERE id = ${pokemonId}),

    stats AS (UPDATE pokemon_stats as stats SET value = stat.value FROM (VALUES ('hitpointsEv', ${stats.hitpointsEv}), ('attackEv', ${stats.attackEv}), ('defenseEv', ${stats.defenseEv}), ('specialAttackEv', ${stats.specialAttackEv}), ('specialDefenseEv', ${stats.specialDefenseEv}), ('speedEv', ${stats.speedEv}), ('hitpointsIv', ${stats.hitpointsIv}), ('attackIv', ${stats.attackIv}), ('defenseIv', ${stats.defenseIv}), ('specialAttackIv', ${stats.specialAttackIv}), ('specialDefenseIv', ${stats.specialDefenseIv}), ('speedIv', ${stats.speedIv})) as stat(stat, value) WHERE stats.stat = stat.stat AND stats.pokemon_id = ${pokemonId})

    UPDATE pokemon_moves as moves SET move = move.move FROM (VALUES ('first', '${moves[0]}'), ('second', '${moves[1]}'), ('third', '${moves[2]}'), ('fourth', '${moves[3]}')) as move(move, move_order) WHERE moves.move_order = move.move_order AND moves.pokemon_id = ${pokemonId}
    `,
    (error) => {
      if (error) {
        throw error
      }
      res.status(200).json(req.body)
    }
  )
}

module.exports = {
  getAllUsersPokemon,
  getPokemon,
  getAllCreatedPokemon,
  postPokemon,
  updatePokemon
}
