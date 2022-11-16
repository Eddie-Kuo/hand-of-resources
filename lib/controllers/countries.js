const { Router } = require('express');
const { Country } = require('../models/Country');

module.exports = Router()
  .get('/', async (req, res) => {
    const country = await Country.getAll();
    res.json(country);
  })
  .post('/', async (req, res) => {
    const country = await Country.post(req.body);
    res.json(country);
  });
