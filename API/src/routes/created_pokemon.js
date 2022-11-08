const { Router } = require('express')

const { getAllUsersPokemon, getPokemon, postPokemon } = require('../controllers/created_pokemon')

const router = Router()

router.get('/:userId', (req, res) => {
    res.send("get every pokemon for user")
})

router.get('/:userId/:pokemonId', (req, res) => {
    res.send("get selected pokemon for user")
})

router.post('/', postPokemon)

module.exports = router