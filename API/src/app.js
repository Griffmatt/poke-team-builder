const express = require('express');
const cors = require('cors');
require('dotenv').config()

const app = express();

const created_pokemon_routes = require('./routes/created_pokemon')

const teams_routes = require('./routes/teams')

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.json({ type: 'application/vnd.api+json' }));
app.use(cors());

app.use("/pokemon", created_pokemon_routes)
app.use("/team", teams_routes)


module.exports = app