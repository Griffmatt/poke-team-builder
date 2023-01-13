const { Router } = require('express')

const { getUser, createUser, checkUserName, loginUser, checkForCurrentUser } = require('../controllers/users')

const router = Router()

router.get('/:userId', getUser)

router.get('/user-name/:userName', checkUserName)

router.post('/login', loginUser)

router.post('/', createUser)

router.get('/', checkForCurrentUser)

module.exports = router
