const router = require('express').Router();
const { User } = require('../db/index');
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

router.get('/pastGame', hasUserToken, async (req, res, next) =>{
  try{
    console.log("fetching past game...")
    //let user = await User.findByPk(req.params.id)
    if(req.user){
      res.json(req.user.pastGame)
    }else{
      res.status(404).send();
    }
  }catch(err){
    next(err);
  }

})

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




router.get('/:id/liveGame', hasUserToken, isLoggedInUser, async (req, res, next) =>{
  try{
    let user = await User.findByToken(req.params.id)
    if(user){
      res.json(user.liveGame)
    }else
      res.status(404).send();
  }catch(err){
    next(err);
  }

})

router.post('/pastGame', hasUserToken, async (req, res, next) =>{
  try{
        console.log("fething user..")

    //let user = await User.findByToken(req.headers.authorization)
    console.log("found user!")
    if(req.user){
      console.log("upating pastgame on db")
      req.user.update({pastGame: req.body})
      res.status(200).send()
      console.log("game was updated")
    }else{
      res.status(404).send("Couldn't Save Game!");
    }
  }catch(err){
    next(err);
  }

})

router.post('/liveGame', hasUserToken, isLoggedInUser, async (req, res, next) =>{
  try{
    let user = await User.findByPk(req.params.id)
    if(user){
      user.update({liveGame: req.body})
    }else{
      res.status(404).send();
    }
  }catch(err){
    next(err);
  }

})

module.exports = router;
