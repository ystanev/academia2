var mongoose = require( 'mongoose' );
//var Schema = mongoose.Schema;

var roleModel = new mongoose.Schema({
    roleDesc: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Role', roleModel);