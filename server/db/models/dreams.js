var mongoose = require('mongoose');
// var User = mongoose.model('User'); 


var dreamSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now
  },
  location: {
    type: [String]
  },
  content: {
    type: String,
    required: true
  },
  tags: {
    type: [mongoose.Schema.Types.tagName],
    ref: 'Tag'
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
})

mongoose.model('Dream', dreamSchema);