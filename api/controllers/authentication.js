var passport = require('passport');
var mongoose = require('mongoose');
//var Role = require('../models/roles');
var User = mongoose.model('User');

var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports.register = function(req, res) {

  /*if(!user.fname || !user.lname ||!user.email || !user.program || !req.body.password ) {
     sendJSONresponse(res, 400, {
       "message": "All fields required",
     });
     return;
  }*/

  //let errors = [];

  var user = new User();
  /*
  var role = new Role({
    roleDesc: 'user'
  });*/

  user.fname = req.body.fname;
  user.lname = req.body.lname;
  user.email = req.body.email;
  user.program = req.body.program;
  user.roles.roleDesc = 'normalUser';
  
  //user.roles.setText('user');
  //user.roles.push('user');
  //user.roles = role._id;
  
  user.setPassword(req.body.password);

  user.save(function(err) {
    var token;
    token = user.generateJwt();
    res.status(200);
    res.json({
      "token" : token
    });
  });

};

module.exports.login = function(req, res) {

  // if(!req.body.email || !req.body.password) {
  //   sendJSONresponse(res, 400, {
  //     "message": "All fields required"
  //   });
  //   return;
  // }

  passport.authenticate('local', function(err, user, info){
    var token;

    // If Passport throws/catches an error
    if (err) {
      res.status(404).json(err);
      return;
    }

    // If a user is found
    if(user){
      token = user.generateJwt();
      res.status(200);
      res.json({
        "token" : token
      });
    } else {
      // If user is not found
      res.status(401).json(info);
    }
  })(req, res);

};