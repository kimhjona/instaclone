const Session = require('./sessionModel');

const sessionController = {};


sessionController.isLoggedIn = (req, res, next) => {
  // console.log('rec.objId:', rec.objId);
  // Session.cookieId = res.locals.id;
  Session.findOne(res.objId, (err, doc) => {
    console.log('doc:', doc)
    if (err) {
      console.log('SESSION NOT FOUND', err);
    } else if (!doc) {
      res.redirect('/signup');
    } else {
      next();
    }
  })
  next();
};

sessionController.startSession = (req, res, next) => {
  const objId = {'cookieId': res.locals.id}
  Session.create(objId, (err, session) => {
    if (err) console.log('err:',err);
    else {
      next();
    }
  });
  
};

module.exports = sessionController;
