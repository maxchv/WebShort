var express = require('express');
var router = express.Router();
var db = require("../db/memory");
var mongo = require("../db/mongo");
const user = require('../db/user');


/* GET home page. */
router.get('/', function (req, res, next) {
  mongo.findAll((posts) => {
    res.render('index', {
      title: "Home page",
      posts: posts //db.findAll()
    });
  });
});

module.exports = router;