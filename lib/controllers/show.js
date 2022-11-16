const { Router } = require('express');
const { Show } = require('../models/Show');

module.exports = Router()
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
