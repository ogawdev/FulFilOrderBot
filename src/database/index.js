const mongoose = require("mongoose");
const config = require("../utils/config");

const connectDB = async () => {
  try {
    mongoose.set("strictQuery", false);
    mongoose.connect(config.DB_URI);
    console.log("Mongo connected");
  } catch (error) {
    console.log(error);
    process.exit();
  }
};

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    userId: { type: String, required: true },
    fullName: String,
    phone: String,
  })
);

module.exports = { User, connectDB };
