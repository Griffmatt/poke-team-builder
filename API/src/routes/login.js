const { Router } = require('express')

const {
  loginUser,
  handleRefreshToken,
  logoutUser
} = require('../controllers/login')
const { checkForValidToken } = require('../JWT')

const router = Router()

router.post('/log-out', logoutUser)

router.post('/', loginUser)

router.get('/with-token', checkForValidToken, handleRefreshToken)

module.exports = router
