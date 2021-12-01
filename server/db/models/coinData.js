const Sequelize = require("sequelize");
const db = require("../db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const axios = require("axios");

const SALT_ROUNDS = 5;

const coinData = db.define("coinData",{
    coinData:{
        type: Sequelize.JSON,
    }
}
);

module.exports = coinData;