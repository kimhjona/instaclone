const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pictureSchema = new Schema({
  url: {type: String, required: true},
  created_by: {type: String, required: true}
})
module.exports = mongoose.model('Picture', pictureSchema);