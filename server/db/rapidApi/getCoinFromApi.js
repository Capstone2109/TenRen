const axios = require('axios')


async function getDailyCoinHistory(coinId,timeFrame='7d'){

  try {
    //Make call to the api for one specific coin (based on ID of the coin in the api)
    let result = await axios.get(`https://coinranking1.p.rapidapi.com/coin/${coinId}/history/${timeFrame}`, {
      headers: {
      'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
      'x-rapidapi-key': '9973d4d458msh3093964e4eb1947p12b1b1jsn021aaeb8292e',
    }
  })
 // example of getCryptoHistory
  // getCryptoHistory: builder.query({
  //   query: ({ coinId, timePeriod }) => createRequest(`coin/${coinId}/history?timePeriod=${timePeriod}`),
  // }),


  //Divide the data set into 1 per day (for each day 24 object sets are returned from the api, we only need 1 per day)
  let list = result.data?.data?.history.filter((obj,index) => (index+1)%24 === 0)
  return list
  } catch (error) {
    console.log(error)
  }
}


module.exports ={ getDailyCoinHistory }
