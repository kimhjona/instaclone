const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

const userController = require('./user/userController');
const cookieController = require('./util/cookieController');
const sessionController = require('./session/sessionController');
const pictureController = require('./pictures/pictureController');

const app = express();
const port = 3000;

const mongoURI = 'mongodb://admin:admin@ds139198.mlab.com:39198/pictures';
mongoose.connect(mongoURI);

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, '../public')));
app.use(cookieParser());

app.get('/', (req, res) => {
  res.render('./../client/index', {loggedin: null});
});

app.get('/signup', (req, res) => {
  res.render('./../client/signup', {error: null});
});

app.post('/signup',
  userController.createUser, 
  cookieController.setSSIDCookie, 
  sessionController.startSession, 
  (req, res) => {
    res.redirect('/home');
  });

app.post('/login', 
  userController.verifyUser, 
  cookieController.setSSIDCookie, 
  sessionController.startSession,
  sessionController.isLoggedIn,
  (req, res) => {
    res.redirect('/home');
  });

app.get('/home', (req, res, next) => {
  userController.getAllUsers((err, users) => {
    if (err) console.log(err);
    // res.render('./../client/upload', { users: users, cookie: req.cookies.username});
    console.log('users before picture function:', users);
    req.users = {users: users};
    next();
  });
}, (req, res) => {
  console.log('now in piccontroller middleware');
  pictureController.getAllPictures((err, pictures) => {
    if (err) console.log(err);
    console.log('pictures:', pictures);
    console.log('users:', req.users.users);
    res.render('./../client/upload', { cookie: req.cookies.username, pictures: pictures, users: req.users.users});
  });
});

app.post('/home', 
  pictureController.sendPicture, 
  (req, res) => {
    res.redirect('/home');
});

app.get('/public', (req, res) => {
  pictureController.getAllPictures((err, pictures) => {
    if (err) console.log(err);
    res.render('./../client/public', { pictures: pictures });
  });
});

app.listen(port);

module.exports = app;
