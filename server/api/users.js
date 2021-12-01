const router = require('express').Router();
const {
  User,
} = require('../db/index');
const { hasUserToken, isAdmin, isLoggedInUser } = require('./gatekeepingMiddleware');

router.get('/', hasUserToken, isAdmin, async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'username'], //returning only needed data from users safer! even with admin
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', hasUserToken,isLoggedInUser, async (req, res, next) => {
  try {
    //passing only data that is need for compnent rendering.
    let user = await User.findByPk(req.params.id);
    let safeUserData = {
      id: user.dataValues.id,
      username: user.dataValues.username,
      userimageURL: user.dataValues.userimageURL,
    };
    user = {
      ...safeUserData,
    };
     res.json(user);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
