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
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    }
});

module.exports = mongoose.model('Book', bookSchema);

