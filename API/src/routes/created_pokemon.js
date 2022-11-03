const { Router } = require('express')

const { getAllUsersPokemon, getPokemon } = require('../controllers/created_pokemon')

const router = Router()

router.get('/:id', (req, res) => {
    console.log("get every pokemon for user")
})

router.get('/pokemon/:id', (req, res) => {
    console.log("get selected pokemon for user")
})

module.exports = router