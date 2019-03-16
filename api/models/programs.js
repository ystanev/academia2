var mongoose = require( 'mongoose' );

var programSchema = new mongoose.Schema({
    // programCode: {
    //     type: String
    // },
    programName: {
        type: String
    },
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
});

module.exports = mongoose.model('Program', programSchema);
