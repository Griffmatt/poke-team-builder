const { Router } = require('express')

const { getAllUsersTeams, getTeam, postTeam } = require('../controllers/teams')

const router = Router()

router.get('/:id', getAllUsersTeams)

router.get('/team/:id', getTeam)

router.post('/', postTeam)

module.exports = router