var mongoose = require( 'mongoose' );

var bookInstanceSchema = new mongoose.Schema({
    
});

bookSchema.virtual('url').get(function(){
    return '/catalog/book/' + this._id;
});

module.exports = mongoose.model('Book', bookInstanceSchema);