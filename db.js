const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

const connection = async()=> {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error(err);
  }
}

module.exports = {connection};
