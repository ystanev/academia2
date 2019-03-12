var user = require('../models/users');
var book = require('../models/books');
var multer = require('multer');

var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var auth = jwt({
  secret: 'MY_SECRET',
  userProperty: 'payload'
});

var ctrlProfile = require('../controllers/profile');
var ctrlAuth = require('../controllers/authentication');

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

// file upload =============================================

const storage = multer.diskStorage({
  destination: "./public/uploads/",
  filename: function(req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  }
});

// Init Upload
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1000000000000
  },
  fileFilter: function(req, file, cb) {
    checkFileType(file, cb);
  }
}).single("fileName");

// Check File Type
function checkFileType(file, cb) {
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif|pdf/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: Images Only!");
  }
}

router.get("/upload", (req, res) => res.render("index"));
  
router.post("/upload", (req, res) => {
  upload(req, res, err => {
    if (err) {
      res.render("index", {
        msg: err
      });
    } else {
      if (req.file == undefined) {
        res.render("index", {
          msg: "Error: No File Selected!"
        });
      } else {
        res.render("index", {
          msg: "File Uploaded!",
          file: `uploads/${req.file.filename}`
        });
      }
    }
  });
});
//==========================================================

// authentication
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

module.exports = router;
