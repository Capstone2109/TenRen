const router = require("express").Router();

router.use('/users', require('./users'))
router.use('/news', require('./news'))
router.use('/cryptos', require('./cryptos'))
router.use('/cryptoHistory', require('./cryptoHistroy'))

router.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

module.exports = router;
