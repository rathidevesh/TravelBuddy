const mongoose = require("mongoose");

const { Schema } = mongoose;

const bookingschema = new Schema({
    bookeduser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },
    car_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "car",
    },
    mobileNumber : {type : String},
    startDate : {type : String},
    endDate :{type :String},
    carname : {type : String},
    carcost: {type : String},
    carphoto : {type : String},
    
    date: {
        type: Date,
        default: Date.now,
    }
    
  });
  const Bookcar = mongoose.model('bookings', bookingschema);
  module.exports = Bookcar;