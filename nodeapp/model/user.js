/**
 * Created by dixiao on 2015/11/23.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// Set our collection
var userSchema = new Schema({
    username: String,
    age: Number
});
exports.user=mongoose.model('user', userSchema);
