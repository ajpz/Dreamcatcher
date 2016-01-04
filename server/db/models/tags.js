var mongoose = require('mongoose'); 

var tagSchema = new mongoose.Schema({
  tagName: { type: String, required: true }, 
  dreams: { type: [mongoose.Schema.Types.ObjectId], ref: 'Dream' }
})

mongoose.model('Tag', tagSchema);
