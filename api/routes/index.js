var user = require('../models/users');
var book = require('../models/books');
var multer = require('multer');
const path = require('path');
var program = require('../models/programs');
var subscription = require('../models/subscription');

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
  }).populate('program').exec();
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
      /*file.fieldname + "-" + Date.now() + path.extname(file.originalname)*/ file.originalname
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

//router.get("/upload", (req, res) => res.render("index"));
  
router.get("/upload", function(req, res){
  res.sendFile(__dirname + "index");
});

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

router.use(express.static("./public"));
//==========================================================
//create a program
router.post('/programs', ctrlProgram.add);

//get all programs
// router.get('/programs', ctrlProgram.getAll);
router.get('/programs', function(req, res, next) {
  program.find({}, function(err, programs) {
    if(err){
      res.send('wrong');
      console.log(err);
      return next(err);
    }
    res.json(programs);
  }).populate('users').exec();
});

//get a program
router.get('/programs/:id', function(req, res, next) {
  program.findById(req.params.id, function(err, program) {
    if(err){
      return next(err);
    }
    res.json(program);
  }).populate('users').exec();
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

//update program
router.put('/programs/:id', function(req, res, next) {
  program.users.push(user);
  program.findOneAndUpdate(req.params.id, req.body, function(err, update) {
    if(err){
      return next(err);
    }
    res.json(update);
  }).populate('users').exec();
});

// authentication
router.post('/register', ctrlAuth.register);
/*router.post('/register', function(req, res) {
  user.create(req.body, function(err, newUsers) {
    if(err){
      console.log(err);
    }else {
      program.findOneAndUpdate({users: newUsers._id}, function(err, found) {
        if(err){
          console.log(err);
        }else {
          found.users.push(newUsers);
          found.save();

          res.json(found);
        }
      });
    }
  });
});*/

router.post('/login', ctrlAuth.login);

router.post('/subscription',function(req,res){
  userId = req.body.userId;
  bookId = req.body.bookId;


  subscription.findOne({"userRef": userId},function(err,post){
    if(err){
      console.log(err);
    }else{
      if(post == null || post == undefined){
        subscription.create({"userRef": userId, "bookRef":[bookId]},function(err,post){
          if(err){
            console.log(err);
          }else{
            res.json(post);
          }
        });
      }else{
        bookExist = false;
        for(i=0; i < post.bookRef.length;i++){
          console.log(post.bookRef[i]);
          if(post.bookRef[i] == bookId){
            bookExist = true;
            break;
          }
        }
        if(bookExist){
          res.json({"alreadyExists": true});
        }else{
          post.bookRef.push(bookId);
          post.save();
          res.json(post);
        }     
        
      }
    }
  });


});

module.exports = router;
