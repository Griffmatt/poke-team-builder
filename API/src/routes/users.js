const { Router } = require('express')

const { getUser, createUser, checkUserName } = require('../controllers/users')

const router = Router()

router.get('/:userId', getUser)

router.get('/user-name/:userName', checkUserName)

router.post('/', createUser)

module.exports = router
