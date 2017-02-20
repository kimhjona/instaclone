const User = require('./userModel');
const cookieController = require('./../util/cookieController');
const sessionController = require('./../session/sessionController');

const userController = {};

userController.getAllUsers = (next) => {
  User.find({}, next);
};

userController.createUser = (req, res, next) => {
  User.create(req.body, (error, doc) => {
    if (error) res.render('./../client/signup', {error:"Something wen't horribly wrong!"});
    else {
      res.username = {'username': req.body.username};
      res.locals = {'id': doc._id};
      next();
    }
  });
};



userController.verifyUser = (req, res, next) => {
  User.findOne({username: req.body.username}, (err, user) => {
    if (err || !user) res.redirect('/signup');
    else {
      if (user.password === req.body.password) {
        res.username = {'username': req.body.username};
        res.locals = {'id': user._id};
        next();
      } else {
        res.redirect('/signup');
      }
    }
  })
};

module.exports = userController;
