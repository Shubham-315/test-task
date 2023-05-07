const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  sex: {
    type: String,
    required: true
  },
  mobile: {
    type: String
  },
  emergency: {
    type: String
  },
  idType: {
    type: String
  },
  idNumber: {
    type: String
  },
  guardianName: {
    type: String
  },
  email: {
    type: String
  },
  addr: {
    type: String
  },
  state: {
    type: String
  },
  city: {
    type: String
  },
  country: {
    type: String
  },
  pincode: {
    type: String
  },
  occupation: {
    type: String
  },
  religion: {
    type: String
  },
  maritalStatus: {
    type: String
  },
  bloodGroup: {
    type: String
  },
  nationality: {
    type: String
  }
})

module.exports = mongoose.model("User", UserSchema);