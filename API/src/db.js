const { Pool } = require('pg')

const devPool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'griff-team-builder',
  password: 'postgres',
  port: 5432
})

const pool = new Pool({
  user: 'postgres',
  host: 'containers-us-west-98.railway.app',
  database: 'railway',
  password: 'SBCZHr6JnC0DuU76ttra',
  port: 6302
})

module.exports = pool
