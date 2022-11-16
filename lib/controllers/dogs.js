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
  })
  .get('/:id', async (req, res, next) => {
    try {
      const dogs = await Dog.getDogById(req.params.id);
      res.json(dogs);
    } catch (e) {
      next(e);
    }
  })
  .put('/:id', async (req, res, next) => {
    try {
      const dog = await Dog.update(req.params.id, req.body);
      res.json(dog);
    } catch (e) {
      next(e);
    }
  })
  .delete('/:id', async (req, res, next) => {
    try {
      const dog = await Dog.delete(req.params.id);
      if (!dog) return null;
      res.status(204);
      res.send();
    } catch (e) {
      next(e);
    }
  });
