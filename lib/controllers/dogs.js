const { Dog } = require('../models/Dog');
const { Router } = require('express');

module.exports = Router().post('/', async (req, res, next) => {
  try {
    const dogs = await Dog.post(req.body);
    res.json(dogs);
  } catch (e) {
    next(e);
  }
});
