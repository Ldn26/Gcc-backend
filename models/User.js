// const {DataTypes} = require('sequelize');
// const sequelize = require('../config');
// const User = sequelize.define('User', {
//     id : {
//         type : DataTypes.INTEGER,
//         primaryKey : true,
//         autoIncrement : true
//     },
//     name : {
//         type : DataTypes.STRING,
//         allowNull : false
//     },
//     email : {
//         type : DataTypes.STRING,
//         allowNull : false,
//         unique : true
//     },
//     password : {
//         type : DataTypes.STRING,
//         allowNull : false
//     },
// })



// module.exports = User;








const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    tradenumber: {
      type: Number,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    servicetype: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
      unique: true,
      trim: true,
    },
  },
  {
    timestamps: true, // Optional: adds createdAt and updatedAt
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
