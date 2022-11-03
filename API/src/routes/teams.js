const { Router } = require('express')

const { getAllUsersTeams, getTeam } = require('../controllers/created_pokemon')

const router = Router()

router.get('/:id', (req, res) => {
    
})

router.get('/team/:id', (req, res) => {

})

module.exports = router