const { Pool } = require('pg')

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'griff-team-builder',
  password: 'postgres',
  port: 5432
})

module.exports = pool
