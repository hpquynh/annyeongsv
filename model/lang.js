var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Words ={ en: { type: String }, kr: { type: String }};

var Lang = new Schema({
    lang: Words
});


module.exports = mongoose.model('lang', Lang);
