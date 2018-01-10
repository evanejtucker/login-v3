// Require mongoose
var mongoose = require("mongoose");

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

var User = mongoose.model("User", UserSchema);

module.exports = User;
