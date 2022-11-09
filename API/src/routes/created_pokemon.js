const { Router } = require('express')

const { getAllUsersPokemon, getPokemon, postPokemon, getAllCreatedPokemon } = require('../controllers/created_pokemon')

const router = Router()

router.get('/', getAllCreatedPokemon)

router.get('/:userId', getAllUsersPokemon)

router.get('/:userId/:pokemonId', (req, res) => {
    res.send("get selected pokemon for user")
})

router.post('/', postPokemon)

module.exports = router