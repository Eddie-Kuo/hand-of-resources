const { Router } = require('express');
const { Pokemon } = require('../models/Pokemon');

module.exports = Router()
  .put('/:id', async (req, res, next) => {
    try {
      const pokemon = await Pokemon.updatePokemon(req.params.id, req.body);
      res.json(pokemon);
    } catch (e) {
      next(e);
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const pokemon = await Pokemon.getPokemonById(req.params.id);
      res.json(pokemon);
    } catch (e) {
      next(e);
    }
  })
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
