const { Router } = require('express');
const { Show } = require('../models/Show');

module.exports = Router().post('/', async (req, res, next) => {
  try {
    const show = await Show.post(req.body);
    res.json(show);
  } catch (e) {
    next(e);
  }
});
