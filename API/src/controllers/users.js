const pool = require('../db')
const queries = require('../queries/users')

const getUser = (req, res) => {
  const userId = parseInt(req.params.userId)
  pool.query(queries.getUser, [userId], (error, results) => {
    if (error) throw error
    res.status(200).json(results.rows)
  })
}

const loginUser = (req, res) => {
  const { user_name, password } = req.body
  pool.query(queries.loginUser, [user_name, password], (error, results) => {
    if (error) throw error
    res.status(200).json(results.rows)
  })
}

const createUser = (req, res) => {
  const { name, user_name, password, is_admin } = req.body
  pool.query(
    queries.createUser,
    [name, user_name, password, is_admin],
    (error, results) => {
      if (error) throw error
      res.status(200).json(results.status)
    }
  )
}

const checkUserName = (req, res) => {
  const userName = req.params.userName
  pool.query(
    queries.checkUserName,
    [userName],
    (error, results) => {
      if (error) throw error
      res.status(200).json(results.rows)
    }
  )
}

module.exports = {
  getUser,
  createUser,
  loginUser,
  checkUserName
}
