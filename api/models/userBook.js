var mongoose = require( 'mongoose' );
//var Schema = mongoose.Schema;

var userBookSchema = new mongoose.Schema({
    userRef: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    bookRef: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book'
    }]
});

module.exports = mongoose.model('UserBook', userBookSchema);