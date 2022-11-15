const { Router } = require('express');
const { Avenger } = require('../models/Avenger');

module.exports = Router().post('/', async (req, res, next) => {
  try {
    const avenger = await Avenger.post(req.body);
    res.json(avenger);
  } catch (e) {
    next(e);
  }
});
