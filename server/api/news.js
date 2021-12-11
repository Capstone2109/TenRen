const router = require("express").Router();
const { News } = require("../db/index");

router.get("/", async (req, res, next) => {
  //Get all news
  try {
    const news = await News.findAll({});
    res.json(news);
  } catch (error) {
    console.log("Cant get news");
  }
});

router.get("/today", async (req, res, next) => {
  //Get all news
  try {
    const news = await News.findAll({
      where: {
        realTime: true,
      },
    });
    res.json(news);
  } catch (error) {
    console.log("Cant get news");
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    let news = await News.findByPk(req.params.id);
    res.json(news);
  } catch (error) {
    throw "Not a valid news id!";
  }
});

module.exports = router;
