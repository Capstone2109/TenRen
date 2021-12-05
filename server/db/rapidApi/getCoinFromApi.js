const axios = require('axios')


async function getDailyCoinHistory(coinId,timeFrame='7d'){
  
  try {
    let result = await axios.get(`https://coinranking1.p.rapidapi.com/coin/${coinId}/history/${timeFrame}`, {
      headers: {
      'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
      'x-rapidapi-key': 'f6ed2103e1msh1b57104c8a32539p12d792jsna87434a146d0',
    }
  })

  let list = result.data?.data?.history.filter((obj,indx) => (indx+1)%24 === 0)
  return list    
  } catch (error) {
    console.log(error)
  }
}

getDailyCoinHistory(1,"30d")

module.exports ={ getDailyCoinHistory }