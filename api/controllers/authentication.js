var passport = require('passport');
var mongoose = require('mongoose');
//var Role = mongoose.model('Role');
var User = mongoose.model('User');
var program = require('../models/programs');
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

  user.fname = req.body.fname;
  user.lname = req.body.lname;
  user.email = req.body.email;
  user.program = req.body.program;

  user.setPassword(req.body.password);

  user.save(function(err) {
    if(err){
      console.log(err);
    }else {
      var token;
      token = user.generateJwt();
      res.status(200);
      res.json({
        "token" : token
      });
    }
    
    program.findOneAndUpdate({_id: user.program}, req.body, function(err, update) {
      if(err){
        console.log(err);
      }else {
        //console.log(update);
        update.users.push(user);
        update.save();
        //res.json(update);
      }
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