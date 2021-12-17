const mongoose = require("mongoose");
require('dotenv').config();

const connectDB = async () => {
    await mongoose.connect(
      process.env.CONNECTION_STRING,
      (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log("Connected to db");
        }
      }
    );
};

module.exports = { connectDB };