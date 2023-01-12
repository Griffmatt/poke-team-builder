const { sign, verify } = require('jsonwebtoken')
require('dotenv').config()

const createTokens = (user) => {
  const accessToken = sign({
    id: user.id,
    name: user.name,
    user_name: user.user_name,
    ia_admin: user.is_admin
  }, process.env.JWT_SECRET_TOKEN)
}

