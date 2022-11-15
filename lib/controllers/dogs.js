const { Dog } = require('../models/Dog');
const { Router } = require('express');

module.exports = Router()
  .post('/', async (req, res, next) => {
    try {
      const dog = await Dog.post(req.body);
      res.json(dog);
    } catch (e) {
      next(e);
    }
  })
  .get('/', async (req, res, next) => {
    try {
      const dogs = await Dog.getDogs();
      res.json(dogs);
    } catch (e) {
      next(e);
    }
  });
