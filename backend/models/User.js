const mongoose = require('mongoose');
const { Schema } = mongoose;

// Increase the maximum number of listeners for the event emitter
mongoose.connection.setMaxListeners(0);

const UserSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    }

  });

  const User =mongoose.model('user',UserSchema);

  module.exports = User;