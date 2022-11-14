const { Router } = require('express');
const { Pokemon } = require('../models/Pokemon');

module.exports = Router().post('/', async (req, res, next) => {
  try {
    const pokemon = await Pokemon.insertPokemon(req.body);
    res.json(pokemon);
  } catch (e) {
    next(e);
  }
});
