const { Router } = require('express');
const { Country } = require('../models/Country');

module.exports = Router()
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
