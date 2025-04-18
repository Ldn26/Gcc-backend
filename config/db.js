
const mongoose = require("mongoose");









// require("dotenv").config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      "mongodb+srv://ylaidani:fNnNDVEKRNIyrdCo@cluster0.egsxs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
      {
        dbName: "GGC",
        bufferCommands: false,
        connectTimeoutMS: 30000,
      }
    );
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;


