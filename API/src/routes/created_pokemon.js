const { Router } = require('express')
const { validateToken } = require('../JWT')

const { getAllUsersPokemon, getPokemon, postPokemon, getAllCreatedPokemon, updatePokemon, getAllPokemonOnTeam } = require('../controllers/created_pokemon')

const router = Router()

router.get('/', getAllCreatedPokemon)

router.get('/on-team', getAllPokemonOnTeam)

router.get('/users-pokemon/:userId', getAllUsersPokemon)

router.get('/:pokemonId', getPokemon)

router.post('/', validateToken, postPokemon)
router.post('/update/:pokemonId', validateToken, updatePokemon)

module.exports = router
