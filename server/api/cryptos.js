const router = require('express').Router();
const {
    Crypto,
} = require('../db/index');


router.get('/', async (req, res, next) => {
    try {
        const crypto = await Crypto.findAll();
        res.json(crypto);
    } catch (error) {
        next(error);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const crypto = await Crypto.findByPk(req.params.id);
        res.json(crypto);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
