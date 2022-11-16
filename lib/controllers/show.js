const { Router } = require('express');
const { Show } = require('../models/Show');

module.exports = Router()
  .delete('/:id', async (req, res, next) => {
    try {
      const show = await Show.delete(req.params.id);
      if (!show) next();
      res.status(204);
      res.send();
    } catch (e) {
      next(e);
    }
  })
  .put('/:id', async (req, res, next) => {
    try {
      const show = await Show.update(req.params.id, req.body);
      res.json(show);
    } catch (e) {
      next(e);
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const show = await Show.getById(req.params.id);
      res.json(show);
    } catch (e) {
      next(e);
    }
  })
  .get('/', async (req, res, next) => {
    try {
      const shows = await Show.getAll();
      res.json(shows);
    } catch (e) {
      next(e);
    }
  })
  .post('/', async (req, res, next) => {
    try {
      const show = await Show.post(req.body);
      res.json(show);
    } catch (e) {
      next(e);
    }
  });
