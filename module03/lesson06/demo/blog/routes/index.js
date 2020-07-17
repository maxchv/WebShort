var express = require('express');
var router = express.Router();
var db = require("../db/memory");


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    posts: db.findAll()
  });
});

module.exports = router;