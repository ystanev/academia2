var mongoose = require('mongoose');
var Program = mongoose.model('Program');
var user = mongoose.model('User');


module.exports.add = function(req, res) {

  var program = new Program();

  program.programCode = req.body.programCode;
  program.programName = req.body.programName;

  program.users.push(user);
  program.save(function(err) {
    res.status(200);
    res.json({
      "status" : "Success"
    });
  });

};