const Sequelize = require("sequelize");
const db = require("../db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const axios = require("axios");
const Order = require("./Order");

const SALT_ROUNDS = 5;

const User = db.define("user", {
    username: {
      //also email
      type: Sequelize.STRING,
      unique: true,
      //allowNull: false
    },
    password: {
      type: Sequelize.STRING,
    },
    userimageURL: {
      type: Sequelize.STRING,
    },
    isAdmin: {
      // This is for special users
      type: Sequelize.BOOLEAN,
      default: false,
    },
  });

/**
 * instanceMethods
 */
User.prototype.correctPassword = function (candidatePwd) {
    //we need to compare the plain version to an encrypted version of the password
    return bcrypt.compare(candidatePwd, this.password);
  };
  
  User.prototype.generateToken = function () {
    return jwt.sign({ id: this.id }, process.env.JWT);
  };