const pool = require('../db')
const queries = require('../queries/users')
const bCrypt = require('bcrypt')
const { createTokens } = require('../JWT')

const getUser = (req, res) => {
  const userId = parseInt(req.params.userId)
  pool.query(queries.getUser, [userId], (error, results) => {
    if (error) throw error
    res.status(200).json(results.rows)
  })
}

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
      console.log(data)
      res.cookie('access-token', accessToken, { maxAge: 2592000000, HttpOnly: true, SameSite: 'none' })
      res.status(200).json(data)
    }
  })
}

const createUser = (req, res) => {
  const { name, user_name, password, is_admin } = req.body
  const hashedPassword = bCrypt.hash(password, 10)
  pool.query(
    queries.createUser,
    [name, user_name, hashedPassword, is_admin],
    (error, results) => {
      if (error) throw error
      res.status(200).json(results.status)
    }
  )
}

const checkUserName = (req, res) => {
  const userName = req.params.userName
  pool.query(queries.checkUserName, [userName], (error, results) => {
    if (error) throw error
    res.status(200).json(results.rows)
  })
}

module.exports = {
  getUser,
  createUser,
  loginUser,
  checkUserName
}
