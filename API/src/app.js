const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
require('dotenv').config()

const app = express()

const createdPokemonRoutes = require('./routes/created_pokemon')
const teamsRoutes = require('./routes/teams')
const usersRoutes = require('./routes/users')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.json({ type: 'application/vnd.api+json' }))
app.use(cors())
app.use(cookieParser())

app.use('/pokemon', createdPokemonRoutes)
app.use('/teams', teamsRoutes)
app.use('/user', usersRoutes)

module.exports = app
