const pool = require('../db')
const queries = require('../queries/users')
const bCrypt = require('bcrypt')
const { createTokens } = require('../JWT')

const loginUser = (req, res) => {
  const { user_name, password } = req.body
  pool.query(queries.loginUser, [user_name], async (error, results) => {
    if (error) throw error
    const data = results.rows[0]
    const compareHash = await bCrypt.compare(password, data.password)
    if (!compareHash) {
      res.status(400).json({ error: 'Wrong UserName or Password!' })
    }
    if (compareHash) {
      delete data.password
      const accessToken = createTokens(data)
      res.cookie('access-token', accessToken, {
        maxAge: 2592000000,
        HttpOnly: true,
        SameSite: 'none'
      })
      res.status(200).json(data)
    }
  })
}

const loginUserWithToken = (req, res) => {
  res.status(200).json(req.user)
}

const logoutUser = (req, res) => {
  console.log('5')
  res.cookie('access-token', {}, {
    HttpOnly: true,
    SameSite: 'none'
  })
  res.status(200).json({})
}

module.exports = {
  loginUser,
  loginUserWithToken,
  logoutUser
}
