const { sign, verify } = require('jsonwebtoken')

const SECRET_KEY = process.env.JWT_SECRET_KEY

const createTokens = (user) => {
  const accessToken = sign(
    {
      id: user.id,
      name: user.name,
      user_name: user.user_name,
      ia_admin: user.is_admin
    },
    SECRET_KEY,
    { expiresIn: '30min' }
  )

  const refreshToken = sign(
    {
      id: user.id,
      name: user.name,
      user_name: user.user_name,
      ia_admin: user.is_admin
    },
    SECRET_KEY,
    { expiresIn: '30d' }
  )

  return { accessToken, refreshToken }
}

const validateToken = (req, res, next) => {
  const authorization = req.headers.authorization

  const accessToken = authorization?.split(' ')[1]
  console.log(accessToken)
  if (!accessToken) {
    return res.status(401).json({ error: 'User not Authenticated!' })
  }
  try {
    const validToken = verify(accessToken, SECRET_KEY)
    if (validToken) {
      req.user = validToken
      return next()
    }
  } catch (err) {
    return res.status(403).json({ error: err })
  }
}

const checkForValidToken = (req, res, next) => {
  const accessToken = req.cookies['refresh-token']
  try {
    const validToken = verify(accessToken, SECRET_KEY)
    if (validToken) {
      req.user = validToken
      return next()
    }
  } catch (err) {
    return res.status(200).json(null)
  }
}

module.exports = { createTokens, validateToken, checkForValidToken }
