'use strict';
var router = require('express').Router();
var mongoose = require('mongoose');
var Dream = mongoose.model('Dream');
module.exports = router;

var ensureAuthenticated = function(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401).end();
  }
};

router.get('/', function(req, res, next) {

  var query = {};

  //check for req.query
  if (req.query) {
    // query string should have following keys: 'user', '_id', 'tag'
    //  'user' is User primary key
    //  '_id' is Dream primary key
    //  'tag' is Tag primary key
    query = req.query;
  }

  //TODO: tag query needs to be able to search an array of tags for the query tag
  //  only handles a single tag right now

  //get all dreams or dreams limited by query string
  Dream.find(query).exec()
    .then(function(dreams) {
      res.status(200).send(dreams);
    })
    .then(null, next);

});

router.post('/', ensureAuthenticated, function(req, res, next) {
  // req.body === { user: 'xyz', content: 'drealkjfalkjdf lkajdf', tag: ['romance']}; 
  //newDreams require: 'user', content
  var newDream = new Dream(req.body);
  newDream.save()
    .then(function(savedDream) {
      console.log('saved!')
      res.status(200).send(savedDream);
    })
    .then(null, function(err) {
      //we handle error here, short-circuiting final error
      res.status(500).send(err);
    });

});

//TODO: fix PUT - isn't updating document yet
router.put('/:dreamId', function(req, res, next) {
  console.log('hit put route with ', req.params.dreamId, req.body)
  Dream.findOneAndUpdate({
      _id: req.params.id
    }, req.body, {
      runValidators: true,
      new: true
    })
    .then(function(updatedDream) {
      console.log('updated dream: ', updatedDream); 
      res.status(200).send(updatedDream);
    })
    .then(null, next); 
});

router.delete('/:dreamId', function(req, res, next) {
  Dream.remove({
      _id: req.params.dreamId
    })
    .then(function(dream) {
      res.status(204).end();
    })
});