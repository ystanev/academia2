var mongoose = require('mongoose');
var Program = mongoose.model('Program');


module.exports.add = function(req, res) {

  var program = new Program();

  // program.programCode = req.body.programCode;
  program.programName = req.body.programName;

  program.save(function(err) {
    res.status(200);
    res.json({
      "status" : "Success"
    });
  });

};

// module.exports.getAll = function(req, res) {

//   var program = new Program();

//   program.programCode = req.body.programCode;
//   program.programName = req.body.programName;

//   program.save(function(err) {
//     res.status(200);
//     res.json({
//       "status" : "Success"
//     });
//   });

// };
