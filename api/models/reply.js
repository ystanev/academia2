var mongoose = require( 'mongoose' );

var repliesSchema = new mongoose.Schema({
   question: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Questions'
   },
   reply:{
       type: String,
   }
});

module.exports = mongoose.model('Replies', repliesSchema);