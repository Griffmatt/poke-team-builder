const { Router } = require('express')

const {
  loginUser,
  loginUserWithToken,
  logoutUser
} = require('../controllers/login')
const { checkForValidToken } = require('../JWT')

const router = Router()

router.post('/log-out', logoutUser)

router.post('/', loginUser)

router.post('/with-token', checkForValidToken, loginUserWithToken)

module.exports = router
