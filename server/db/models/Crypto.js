const Sequelize = require('sequelize')
const db = require("../db");

const staticCryptoList = [ 
    {name: 'Bitcoin', coinRankingId: 1},
    {name: 'Ethereum' , coinRankingId: 2 },
    {name: 'Binance Coin' , coinRankingId: 14 },
    {name: 'Thether USD' , coinRankingId: 8 },
    {name: 'Terra' , coinRankingId: 62458 },
    {name: 'Solana' , coinRankingId: 68905 },
    {name: 'Cardano' , coinRankingId: 9 },
    {name: 'HEX' , coinRankingId: 5331 },
    {name: 'USDC' , coinRankingId: 1760 },
    {name: 'XRP' , coinRankingId: 3 },
    {name: 'Polkadot' , coinRankingId: 71983 },
    {name: 'Dogecoin' , coinRankingId: 20 },
]

const Crypto = db.define('crypto',{
    name: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
        notEmpty: true
    },
    coinRankingId: {
        type: Sequelize.INTEGER,
        unique: true
    }
})


module.exports = {staticCryptoList,Crypto}