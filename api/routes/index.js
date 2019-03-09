var user = require('../models/users');
var book = require('../models/books');
var program = require('../models/programs');

var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var auth = jwt({
  secret: 'MY_SECRET',
  userProperty: 'payload'
});

var ctrlProfile = require('../controllers/profile');
var ctrlAuth = require('../controllers/authentication');
var ctrlProgram = require('../controllers/program');

// profile
router.get('/profile', auth, ctrlProfile.profileRead);

//get all users
router.get('/user', function(req, res) {
  user.find({}, function(err, users) {
    if(err){
      res.send('wrong');
      next();
    }
    res.json(users);
  });
});

//get a user
router.get('/user/:id', function(req, res, next) {
  user.findById(req.params.id, function(err, post) {
    if(err){
      return next(err);
    }
    res.json(post);
  });
});

//update a user
router.put('/user/:id', function(req, res, next) {
  user.findByIdAndUpdate(req.params.id, req.body, function(err, post) {
    if(err){
      return next(err);
    }
    res.json(post);
  });
});

//delete user
router.delete('/user/:id', function(req, res, next) {
  user.findByIdAndRemove(req.params.id, req.body, function(err, post){
    if(err){
      return next(err);
    }
    res.json(post);
  });
});

//create a book
router.post('/books', function(req, res, next) {
  book.create(req.body, function(err, post) {
    if(err){
      return next(err);
    }
    res.json(post);
  });
});

//get all the books
router.get('/books', function(req, res, next) {
  book.find({}, function(err, books) {
    if(err){
      return next(err);
    }
    res.json(books);
  });
});

//get a book
router.get('/books/:id', function(req, res, next) {
  book.findById(req.params.id, function(err, post) {
    if(err){
      return next(err);
    }
    res.json(post);
  });
})

//update a book
router.put('/books/:id', function(req, res, next) {
  book.findByIdAndUpdate(req.params.id, req.body, function(err, post){
    if(err){
      return next(err);
    }
    res.json(post);
  })
});

//delete a book
router.delete('/books/:id', function(req, res, next) {
  book.findByIdAndRemove(req.params.id, req.body, function(err, post) {
    if(err){
      return next(err);
    }
    res.json(post);
  });
});

//create a program
router.post('/programs', ctrlProgram.add);

//get all programs
// router.get('/programs', ctrlProgram.getAll);
router.get('/programs', function(req, res) {
  program.find({}, function(err, programs) {
    if(err){
      res.send('wrong');
      next();
    }
    res.json(programs);
  });
});

//delete program
router.delete('/programs/:id', function(req, res, next) {
  program.findByIdAndDelete(req.params.id, req.body, function(err, del) {
    if(err){
      return next(err);
    }
    res.json(del);
  });
});

// authentication
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

module.exports = router;
