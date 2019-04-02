var mongoose = require( 'mongoose' );

var questionsSchema = new mongoose.Schema({
  email: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
   },
   bookTitle: {
       type: String,
       required: true
   },
   question: {
       type: String,
       required: true
   },
   reply:[{
       type: mongoose.Schema.Types.ObjectId,
       ref: 'Replies'
   }]
});

module.exports = mongoose.model('Questions', questionsSchema);