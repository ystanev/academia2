var mongoose = require( 'mongoose' );

var programSchema = new mongoose.Schema({
    programName: {
        type: String
    },
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
});

module.exports = mongoose.model('Program', programSchema);
