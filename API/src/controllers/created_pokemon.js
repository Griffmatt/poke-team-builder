const pool = require("../db")

const queries = require("../queries/created_pokemon")

const getAllUsersPokemon = (req, res) => {
    const id = parseInt(req.params.id)
    pool.query(queries.getAllUsersPokemon, id, (error, results) => {
        if(error) throw error
        res.status(200).json(results.rows)
    })
}

const getPokemon = (req, res) => {
    const id = parseInt(req.params.id)
    pool.query(queries.getAllUsersPokemon, id, (error, results) => {
        if(error) throw error
        res.status(200).json(results.rows)
    })
}

module.exports = {
    getAllUsersPokemon,
    getPokemon
}