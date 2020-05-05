var express = require('express');
var router = express.Router();
var Technoloy = require('../models/technology.model.js');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/techno', async function (req, res, next) {
  const response = await Technoloy.getAll();
  res.send(response);
});

module.exports = router;
