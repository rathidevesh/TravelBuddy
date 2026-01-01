const mongoose = require("mongoose");
const { Schema } = mongoose;

const CarSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  cost: {
    type: String,
    required: true,
  },
  cartype:{
    type: String,
    required : true,
  },
  photo: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  
});

module.exports = mongoose.model("cars", CarSchema);
