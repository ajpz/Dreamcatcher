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
  }]

  return Tag.createAsync(tags);
}

var seedDreams = function() {
  console.log('invoked!!!!!!!!!!')
  var userId;

  var dreams = [{
    content: 'I had a dream that one day, our children would be judged by the content of their character and not by the color of their skin.', 
    title: 'Martin Luther King Jr. Dream'
  }, {
    content: 'I went go-kart racing with my ex-boss.'
  }, {
    content: 'I actually had animals for hands.', 
    title: 'Animals'
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