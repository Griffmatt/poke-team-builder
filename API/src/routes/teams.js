const { Router } = require('express')

const { getAllTeams, getAllUsersTeams, getTeam, postTeam, deleteTeam } = require('../controllers/teams')

const router = Router()

router.get('/', getAllTeams)

router.get('/:userId', getAllUsersTeams)

router.get('/team/:teamId', getTeam)

router.post('/', postTeam)

router.delete('/team/:teamId', deleteTeam)

module.exports = router
