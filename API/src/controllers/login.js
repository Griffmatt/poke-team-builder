const pool = require('../db')
const queries = require('../queries/users')
const bCrypt = require('bcrypt')
const { createTokens } = require('../JWT')

const loginUser = (req, res) => {
  const { user_name, password } = req.body
  pool.query(queries.loginUser, [user_name], async (error, results) => {
    if (error) throw error
    const data = results.rows[0]
    console.log(data)
    if (!data) return res.status(403).json({ error: 'Wrong UserName or Password!' })
    const compareHash = await bCrypt.compare(password, data?.password)
    if (!compareHash) {
      return res.status(403).json({ error: 'Wrong UserName or Password!' })
    }

    delete data.password
    const { accessToken, refreshToken } = createTokens(data)
    res.cookie('refresh-token', refreshToken, {
      maxAge: 2592000000,
      HttpOnly: true,
      SameSite: 'none'
    })
    res.status(200).json({ ...data, accessToken })
  })
}

const handleRefreshToken = (req, res) => {
  const { accessToken } = createTokens(req.user)
  res.status(200).json({ ...req.user, accessToken })
}

const logoutUser = (req, res) => {
  console.log('5')
  res.clearCookie('refresh-token')
  res.status(200).json({})
}

module.exports = {
  loginUser,
  handleRefreshToken,
  logoutUser
}
