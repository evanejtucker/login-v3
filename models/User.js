// Require mongoose
var mongoose = require("mongoose");
var bcrypt   = require('bcrypt-nodejs');

// Create a Schema class with mongoose
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true  
  },
  password: {
    type: String,
    unique: true,
    required: true  
  }
});

UserSchema.methods.generateHash = (password)=> {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(7));
};

UserSchema.methods.validPassword = (password, encrypted)=> {
  return bcrypt.compareSync(password, encrypted);
};

var User = mongoose.model("User", UserSchema);

module.exports = User;
