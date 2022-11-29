const getUser =
  'Select "id", "name", user_name, is_admin FROM "user" WHERE "id" = $1'

const createUser =
  'INSERT INTO "user" (name, user_name, password, is_admin) VALUES ($1, $2, $3, $4)'

const checkUserName = 'Select user_name FROM "user" WHERE user_name = $1'

module.exports = {
  getUser,
  createUser,
  checkUserName
}
