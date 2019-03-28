var mongoose = require( 'mongoose' );

var subscriptionSchema = new mongoose.Schema({
    userRef: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    bookRef: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book'
    }]
});

module.exports = mongoose.model('Subscription', subscriptionSchema);