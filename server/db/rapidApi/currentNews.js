const axios = require("axios");
const { News } = require("../index");

const categories = [
  "Bitcoin",
  "Ethereum",
  "Binance coin",
  "Tether USD",
  "Terra",
  "Solana",
  "Cardano",
  "HEX",
  "USDC",
  "XRP",
  "Polkadot",
  "Dogecoin",
];

const options = {
  method: "GET",
  url: "https://bing-news-search1.p.rapidapi.com/news/search",
  params: {
    safeSearch: "Off",
    textFormat: "Raw",
    count: "12",
    freshness: "Day",
  },
  headers: {
    "x-bingapis-sdk": "true",
    "x-rapidapi-host": "bing-news-search1.p.rapidapi.com",
    "x-rapidapi-key": "3c7ef0dfd5msheac71ccb6cc560ep103353jsnb101d0407034",
  },
};

async function getNewsFromApi() {
  try {
    let queue = categories.map((cat) => {
      return { name: cat, data: undefined };
    });

    let info = []
    
    const processQueue = async function () {
      while (queue[0]) {
        try {
          let data = await axios.request({
            ...options,
            params: { ...options.params, q: queue[0].name },
          });
          queue.shift();
          info.push({category: queue[0].name, data: data.data.value});
        } catch (error) {
          await new Promise((resolve) => setTimeout(resolve, 1000)) //wait for 1s
        }
      }
    };

    console.log("Processing Queue");
    await processQueue();
    console.log("Processing Finished!");

    const fields = (state) => ({
      name: state.name,
      url: state.url,
      contentUrl: state.image?.thumbnail?.contentUrl,
      description: state.description,
      provider: state.provider,
      datePublished: state.datePublished,
      category: state.category,
    });

    info = info.map((objCat) => {
      const data = objCat.data.map((obj) => fields(obj));
      return { category: objCat.category, data };
    });

    //console.log("Finalized Info",info[2].data[2].provider);

    return info;
  } catch (error) {
    console.log(error);
  }
}

async function refreshLiveNews() {
  console.log("loading real time news from api...");
  try {
    const newsData = await getNewsFromApi();
    //console.log("news data", JSON.stringify(newsData))

    //await News.destroy({ where: { realTime: true } });
    await News.create({
      data: JSON.stringify(newsData),
      realTime: true
    });
    console.log("Real Time News Refreshed.");
  } catch (error) {
    console.log(error);
  }
}

async function getHoursPastSinceNewsUpdate() {
  try {
    const lastUpdatedTime = await News.findOne({
      where: { realTime: true },
      attributes: ["updatedAt"],
    });
    
    if(!lastUpdatedTime){
      console.log("did not find a update time")
      return 99
    }
    //Returns the amount of HOURS that have past since the last time REAL TIME news was updated
    return (
      Math.abs(
        Date.now() - (new Date(lastUpdatedTime.dataValues?.updatedAt).getTime() || 0)
      ) / 3600000
    );
  } catch (error) {
    console.log(error);
  }
}
module.exports = {
  getNewsFromApi,
  refreshLiveNews,
  getHoursPastSinceNewsUpdate,
};
