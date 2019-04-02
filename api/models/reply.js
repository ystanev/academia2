var mongoose = require( 'mongoose' );

var repliesSchema = new mongoose.Schema({
   bookTitle: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Questions'
   },
   question: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Questions'
   },
   reply:{
       type: String,
       required: true
   }
});

module.exports = mongoose.model('Replies', repliesSchema);