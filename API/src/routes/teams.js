const { Router } = require('express')
const { validateToken } = require('../JWT')

const { getAllTeams, getAllUsersTeams, getTeam, postTeam, deleteTeam } = require('../controllers/teams')

const router = Router()

router.get('/', getAllTeams)

router.get('/:userId', getAllUsersTeams)

router.get('/team/:teamId', getTeam)

router.post('/', validateToken, postTeam)

router.delete('/team/:teamId', validateToken, deleteTeam)

module.exports = router
