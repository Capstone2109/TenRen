const router = require('express').Router();
const {
    CryptoHistory,
} = require('../db/index');


router.get('/', async (req, res, next) => {
    try {
        const crypto = await CryptoHistory.findAll();
        res.json(crypto);
    } catch (error) {
        next(error);
    }
});

router.get('/:name', async (req, res, next) => {
    try {
        const crypto = await CryptoHistory.findOne({where: {name: req.params.name}});
        res.send(crypto.data);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
