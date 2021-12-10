const router = require('express').Router();
const axios = require('axios');
const {
    Crypto,
} = require('../db/index');

//set Options for axios calls that will be made to news api
const options = {
    method: "GET",
    url: "https://coinranking1.p.rapidapi.com",
    headers: {
        'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
        'x-rapidapi-key': '3c7ef0dfd5msheac71ccb6cc560ep103353jsnb101d0407034'
      }
  };


router.get('/price/:name', async (req, res, next) => {
    try {
        const crypto = await Crypto.findOne({where:{name: req.params.name}});
        
        if(crypto){
            const { data } = await axios.request({...options, url: `${options.url}/coin/${crypto.coinRankingId}`})

            res.send({name: req.params.name, price: data.data.coin.price})
        }else{
            res.status(404).send()
        }

    } catch (error) {
        next(error);
    }
});

// router.get('/:id', async (req, res, next) => {
//     try {
//         const crypto = await Crypto.findByPk(req.params.id);
//         res.json(crypto);
//     } catch (error) {
//         next(error);
//     }
// });

module.exports = router;
