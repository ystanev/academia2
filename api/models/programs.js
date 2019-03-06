var mongoose = require( 'mongoose' );

var programSchema = new mongoose.Schema({
    programName: {
        type: String
    }
});

module.exports = mongoose.model('Program', programSchema);
