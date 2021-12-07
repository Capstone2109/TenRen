const Sequelize = require('sequelize')
const db = require('../db')


const CryptoHistory = db.define('cryptohistory',{
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    data: {
        type: Sequelize.JSON
    }
});

module.exports = CryptoHistory