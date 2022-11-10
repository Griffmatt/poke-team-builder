const { Router } = require('express')

const { getAllTeams, getAllUsersTeams, getTeam, postTeam } = require('../controllers/teams')

const router = Router()

router.get('/', getAllTeams)

router.get('/:userId', getAllUsersTeams)

router.get('/team/:userId', getTeam)

router.post('/', postTeam)

module.exports = router