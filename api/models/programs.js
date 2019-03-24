var mongoose = require( 'mongoose' );

var programSchema = new mongoose.Schema({
    // programCode: {
    //     type: String
    // },
    programName: {
        type: String,
        required: true
    },
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
});

module.exports = mongoose.model('Program', programSchema);
