const { Router } = require('express');
const { Pokemon } = require('../models/Pokemon');

module.exports = Router()
  .get('/', async (req, res, next) => {
    try {
      const pokemon = await Pokemon.getPokemon();
      res.json(pokemon);
    } catch (e) {
      next(e);
    }
  })
  .post('/', async (req, res, next) => {
    try {
      const pokemon = await Pokemon.insertPokemon(req.body);
      res.json(pokemon);
    } catch (e) {
      next(e);
    }
  });
