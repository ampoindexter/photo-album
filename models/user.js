'use strict';

var mongoose = require('mongoose');
var jwt = require('jwt-simple');
var JWT_SECRET = process.env.JWT_SECRET;

var User;

var userSchema = mongoose.Schema({
  username: String,
  uid: String,
  email: String
});

userSchema.methods.generateToken = function() {
  var payload = {
    uid: this.uid,
    _id: this._id,
    userName: this.username,
    email: this.email
  };
  var token = jwt.encode(payload, JWT_SECRET);
  return token;
}

User = mongoose.model('User', userSchema);

module.exports = User;