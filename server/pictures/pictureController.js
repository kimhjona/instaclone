const Picture = require('./pictureModel');

const pictureController = {};

pictureController.getAllPictures = (next) => {
  Picture.find({}, next);
};

pictureController.sendPicture = (req, res, next) => {
  const obj = {url: req.body.url, created_by: req.cookies.username};
  Picture.create(obj, (error, pic) => {
    if (error) console.error('Something is wrong with your format!!');
    else {
      res.locals = {'pic': pic._id};
      next();
    }
  })
};

module.exports = pictureController;