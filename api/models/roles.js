var mongoose = require( 'mongoose' );
//var Schema = mongoose.Schema;

var roleModel = new mongoose.Schema({
    roleDesc: {
        type: String,
        required: true
    }
});

mongoose.model('Role', roleModel);