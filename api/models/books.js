var mongoose = require( 'mongoose' );

var bookSchema = new mongoose.Schema({
    bookName: {
        type: String,
        required: true
    },
    bookAuthor: {
        type: String
    },
    bookIsbn: {
        type: String,
        required: true
    },
    bookPath: {
        type: String,
        required: true
    },
    bookPrice: {
        type: Number,
        requires: true  
    },
    uploadedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    program: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Program'
    }
});


module.exports = mongoose.model('Book', bookSchema);

