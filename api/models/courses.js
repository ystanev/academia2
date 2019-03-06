var mongoose = require( 'mongoose' );

var courseSchema = new mongoose.Schema({
   courseCode: {
       type: String,
   },
   courseName: {
       type: String
   },
   program: {
       type: mongoose.Schema.Types.ObjectId,
       ref: 'Program'
   }
});

module.exports = mongoose.model('Course', courseSchema);
