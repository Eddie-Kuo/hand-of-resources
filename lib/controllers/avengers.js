const { Router } = require('express');
const { Avenger } = require('../models/Avenger');

module.exports = Router()
  .delete('/:id', async (req, res, next) => {
    try {
      const avenger = await Avenger.delete(req.params.id);
      res.status(204);
      res.send();
    } catch (e) {
      next(e);
    }
  })
  .put('/:id', async (req, res, next) => {
    try {
      const avenger = await Avenger.update(req.params.id, req.body);
      res.json(avenger);
    } catch (e) {
      next(e);
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const avenger = await Avenger.getById(req.params.id);
      res.json(avenger);
    } catch (e) {
      next(e);
    }
  })
  .get('/', async (req, res, next) => {
    try {
      const avengers = await Avenger.getAll();
      res.json(avengers);
    } catch (e) {
      next(e);
    }
  })
  .post('/', async (req, res, next) => {
    try {
      const avenger = await Avenger.post(req.body);
      res.json(avenger);
    } catch (e) {
      next(e);
    }
  });
