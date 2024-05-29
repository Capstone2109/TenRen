const Sequelize = require("sequelize");
const db = require("../db");

const News = db.define('news',{

    data: {
        type: Sequelize.JSON
    },
    realTime: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
    }
});

module.exports = News;
