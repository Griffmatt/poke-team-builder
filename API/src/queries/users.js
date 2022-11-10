const getUser = `Select "id", "name", user_name, is_admin FROM "user" WHERE "id" = $1`

module.exports = {
    getUser
}