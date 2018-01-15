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

UserSchema.methods.comparePassword = (user, password)=> {
  if (user.password === password) {
    return true;
  } else {
    return false;
  }
}

var User = mongoose.model("User", UserSchema);

module.exports = User;
