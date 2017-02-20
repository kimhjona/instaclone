const mongoose = require('mongoose');
const sessionController = require('./../session/sessionController');
const Schema = mongoose.Schema;

const cookieController = {};
cookieController.setCookie = setCookie;
cookieController.setSSIDCookie = setSSIDCookie;
cookieController.findCookie = findCookie;

function setCookie(req, res, next) {
  res.cookie('username', res.username.username);
  res.cookie('foto.js', 'hi', {httpOnly: true});
  res.cookie('secret', Math.floor(Math.random() * 100), {httpOnly: true});
}

const cookieSchema = new Schema({
  cookie: {type: String, required: true}
})

function findCookie(req, res, next) {
  console.log('req.cookies.username:', req.cookies.username);
  next();
}

function setSSIDCookie(req, res, next) {
  res.cookie('username', res.username.username);
  res.cookie('ssid', res.locals.id, {httpOnly: true});
  next();
}



module.exports = cookieController;