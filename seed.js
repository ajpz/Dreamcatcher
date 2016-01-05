/*

This seed file is only a placeholder. It should be expanded and altered
to fit the development of your application.

It uses the same file the server uses to establish
the database connection:
--- server/db/index.js

The name of the database used is set in your environment files:
--- server/env/*

This seed file has a safety check to see if you already have users
in the database. If you are developing multiple applications with the
fsg scaffolding, keep in mind that fsg always uses the same database
name in the environment files.

*/

var mongoose = require('mongoose');
var Promise = require('bluebird');
var chalk = require('chalk');
var connectToDb = require('./server/db');
var User = Promise.promisifyAll(mongoose.model('User'));
var Dream = Promise.promisifyAll(mongoose.model('Dream'));
var Tag = Promise.promisifyAll(mongoose.model('Tag'));

var seedUsers = function() {

  var users = [{
    email: 'testing@fsa.com',
    password: 'password'
  }, {
    email: 'obama@gmail.com',
    password: 'potus'
  }, {
    email: 'lily@lilyjen.com', 
    password: 'lilyjen'
  }];

  return User.createAsync(users);

};

var seedTags = function() {

  var tags = [{
    tagName: 'romance'
  }, {
    tagName: 'nightmare'
  }, {
    tagName: 'guilt'
  }, {
    tagName: 'stress'
  }, {
    tagName: 'recurring'
  }, {
    tagName: 'water'
  }, {
    tagName: 'vehicles'
  }, {
    tagName: 'school'
  }, {
    tagName: 'death'
  }, {
    tagName: 'flying'
  }, {
    tagName: 'falling'
  }, {
    tagName: 'sex'
  }, {
    tagName: 'childhood'
  }, {
    tagName: 'food'
  }, {
    tagName: 'house'
  }, {
    tagName: 'teeth falling out'
  }, {
    tagName: 'naked'
  }, {
    tagName: 'being chased'
  }, {
    tagName: 'left something behind'
  }, {
    tagName: 'scared'
  }, {
    tagName: 'needed to pee'
  }];

  tags = tags.sort();

  return Tag.createAsync(tags);
}

var seedDreams = function() {
  console.log('invoked!!!!!!!!!!')
  var userId;

  var dreams = [{
    content: 'I had a dream that one day, our children would be judged by the content of their character and not by the color of their skin.', 
    title: 'Martin Luther King Jr. Dream', 
    tags: ['recurring'], 
    date: new Date(1963, 07, 28, 8, 17, 0), 
    location: [38.887859, -77.010255]
  }, {
    content: 'I went go-kart racing with my ex-boss.', 
    date: new Date(2015, 11, 28, 5, 39, 0), 
    tags: ['stress', 'nightmare', 'guilt', 'naked'],
    location: [41.8170512, -71.4561999]
  }, {
    content: 'I ~actually~ had animals for hands.', 
    title: 'Animals for hands',
    tags: ['scared', 'nightmare'], 
    date: new Date(1991, 03, 13, 4, 50, 0), 
    location: [52.507629, 13.144959]
  }, {
    content: 'I kissed a ghost and I liked it.', 
    title: 'I kissed a ghost and I liked it',
    tags: ['sex', 'romance', 'scared', 'recurring'], 
    date: new Date(1893, 01, 20, 3, 02, 0), 
    location: [37.7577627, -122.4726194]
  }, {
    content: 'I fell through an elevator shaft… for what felt like years. Eventually, though, I landed into an ocean and drowned to death. ', 
    title: 'Endlessly falling, or so it seemed',
    tags: ['falling', 'scared', 'water', 'death'],
    date: new Date(2020, 10, 19, 12, 00, 0), 
    location: [-26.1713505, 27.9699845]
  }]; 

  return User.findOneAsync({
      email: 'obama@gmail.com'
    })
    .then(function(user) {
      console.log('in then after user.findOneAsync')
      userId = user._id;
      console.log('id: ', userId); 
      console.log('dreams', dreams)
      return userId; 
    })
    .then(function(userId) {
      dreams.forEach(function(dream) {
        dream.user = userId; 
      })
      return Dream.createAsync(dreams);
    })
    .then(null, console.error.bind(console));

}


connectToDb.then(function() {
  User.findAsync({}).then(function(users) {
    if (users.length === 0) {
      return seedUsers();
    } else {
      console.log(chalk.magenta('Seems to already be user data, exiting!'));
      process.kill(0);
    }
  }).then(function() {
    console.log('got inside 1 ')
    return Tag.findAsync({}).then(function(tags) {
      console.log('in Tag .then')
      if (tags.length === 0) {
        console.log('seeding Tags')
        return seedTags();
      } else {
        console.log(chalk.magenta('Seems to already be tag data, exiting!'));
        process.kill(0);
      }
    })
  }).then(function() {
    console.log('got inside 1 ')

    return Dream.findAsync({}).then(function(dreams) {
      console.log('in Dream .then')
      if (dreams.length === 0) {
        console.log('seeding Dreams');
        return seedDreams();
      } else {
        console.log(chalk.magenta('Seems to already be dream data, exiting!'));
        process.kill(0);
      }
    })
  }).then(function() {
    console.log(chalk.green('Seed successful!'));
    process.kill(0);
  }).catch(function(err) {
    console.error(err);
    process.kill(1);
  });
});