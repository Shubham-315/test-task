const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const User = require('./model/user.model');

const MONGO_URI = 'mongodb+srv://sisodiyapawan382:sisodiyapawan382@cluster0.jldpwc7.mongodb.net/test';
const PORT = 5000;

mongoose.connect(
  MONGO_URI,
  { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB", err);
  })

const app = express();
app.use(cors(
  {
    origin: ['http://localhost:3000']
  }
))
app.use(express.json());

app.post('/submit', async (req, res) => {
  try {
    const user = new User({
      name: req?.body?.name,
      age: req?.body?.age,
      sex: req?.body?.sex,
      mobile: req?.body?.mobile,
      emergency: req?.body?.emergency,
      idType: req?.body?.idType,
      idNumber: req?.body?.idNumber,
      guardianName:req?.body?.guardianName,
      email:req?.body?.email,
      addr:req?.body?.addr,
      state:req?.body?.state,
      city:req?.body?.city,
      country:req?.body?.country,
      pincode:req?.body?.pincode,
      occupation:req?.body?.occupation,
      religion:req?.body?.religion,
      maritalStatus:req?.body?.maritalStatus,
      bloodGroup:req?.body?.bloodGroup,
      nationality:req?.body?.nationality
    })

    await user.save();

    return res.status(200).send({
      userId: user._id,
      status: true,
      message: "Data Saved Succesfully",
    })
  }
  catch (error) {
    return res.status(500).send({
      message: "Internal Server Error"
    })
  }
})

app.get('/data', async (req, res) => {
  try {
    const user = await User.find({});

    return res.status(200).send({
      data: user
    })
  }
  catch (error) {
    return res.status(500).send({
      message: "Internal Server Error",
      error: error
    })
  }
})


app.listen(PORT, () => {
  console.log(`App listening http://localhost:${PORT}`);
});