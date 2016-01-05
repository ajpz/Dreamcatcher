'use strict';
var router = require('express').Router();
var mongoose = require('mongoose');
var Tag = mongoose.model('Tag');
module.exports = router;

router.get('/', function(req, res, next) {

  Tag.find({}).exec()
    .then(function(tags) {
      res.status(200).send(tags); 
    })
    .then(null, next); 

})