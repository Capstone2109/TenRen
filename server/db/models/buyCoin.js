const Sequelize = require("sequelize");
const db = require("../db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const axios = require("axios");

const SALT_ROUNDS = 5;

const buyCoin = db.define("buyCoin",{
    quantity: {
        type: Sequelize.INTEGER,
    },
    coinId: {
        type: Sequelize.INTEGER,
    },
    userId: {
        type: Sequelize.INTEGER,
    }
}
);

module.exports = buyCoin;