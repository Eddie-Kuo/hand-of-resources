const { Router } = require('express');
const { Country } = require('../models/Country');

module.exports = Router()
  .delete('/:id', async (req, res, next) => {
    const country = await Country.delete(req.params.id);
    if (!country) next();
    res.status(204);
    res.send();
  })
  .put('/:id', async (req, res) => {
    const country = await Country.update(req.params.id, req.body);
    res.json(country);
  })
  .get('/:id', async (req, res) => {
    const country = await Country.getById(req.params.id);
    res.json(country);
  })
  .get('/', async (req, res) => {
    const country = await Country.getAll();
    res.json(country);
  })
  .post('/', async (req, res) => {
    const country = await Country.post(req.body);
    res.json(country);
  });
