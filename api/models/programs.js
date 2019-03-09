var mongoose = require( 'mongoose' );

var programSchema = new mongoose.Schema({
    programCode: {
        type: String
    },
    programName: {
        type: String
    }
});

module.exports = mongoose.model('Program', programSchema);
