//this is the access point for all things database related!
const db = require("./db");
const User = require("./models/User");
const News = require('./models/News')
const coinData = require("./models/coinData")
const {Crypto} = require("./models/Crypto")
const CryptoHistory = require("./models/CryptoHistory")
const { Sequelize } = require("sequelize");


//User has many coins
User.hasMany(Crypto, {foreignKey: "userId"})




module.exports = {
  db,
  User,
  News,
  coinData,
  Crypto,
  CryptoHistory
};
