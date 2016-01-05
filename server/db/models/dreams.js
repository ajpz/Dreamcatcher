var mongoose = require('mongoose');
// var User = mongoose.model('User'); 
var Tag = mongoose.model('Tag');

var dreamSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now
  },
  location: {
    type: [Number]
  },
  title: {
    type: String
  },
  content: {
    type: String,
    required: true
  },
  tags: {
    type: [String],
    validate: {
      validator: function(tagsToAdd, respond) {
        console.log('dreamSchema tag validator running')

        return Tag.find({}).exec()
          .then(function(tags) {
            console.log('made it then of validator find')
            var validTags = tags.map(function(tag) {
              return tag.tagName;
            });
            console.log('tags to match: ', validTags, tagsToAdd);
            for (var i = 0; i < tagsToAdd.length; i++) {
              if (validTags.indexOf(tagsToAdd[i]) === -1) return respond(false);
            }
            return respond(true);
          })
      },
      message: 'Your tags are bad'
    }
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

dreamSchema.pre('validate', function(next) {
  if (this.title) {
    return next();
  }

  this.title = this.content.split(" ").slice(0, 3).join(" ");
  next();
});

mongoose.model('Dream', dreamSchema);
