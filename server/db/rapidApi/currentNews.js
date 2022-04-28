const axios = require("axios");
const { News } = require("../index");

//Set the catories of news that need to be fetched
const categories = [
  "Cryptocurrency",
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

//set Options for axios calls that will be made to news api
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
    "x-rapidapi-key": "9973d4d458msh3093964e4eb1947p12b1b1jsn021aaeb8292e",
    //3c7ef0dfd5msheac71ccb6cc560ep103353jsnb101d0407034
  },
};

async function getNewsFromApi() {
  //Create a que for the categories that need to be searched
  try {
    let queue = categories.map((cat) => {
      return { name: cat, data: undefined };
    });

    //array to hold all the solutions from the queue
    let info = [];

    const processQueue = async function () {
      while (queue[0]) {
        try {
          //make an axios call to the api for item in head of queue
          let data = await axios.request({
            ...options,
            params: { ...options.params, q: queue[0].name },
          });

          //push the data for this item to an array
          info.push({ category: queue[0].name, data: data.data.value });
          //remove this item from the queue
          queue.shift();
        } catch (error) {
          //If an error occurs (exceeded api call limit for that second), wait 1 second to continue
          await new Promise((resolve) => setTimeout(resolve, 1000)); //wait for 1s
        }
      }
    };

    console.log("Processing Queue");
    //call the queue to be processed
    await processQueue();
    console.log("Processing Finished!");

    //composition function to extract info needed out of each data object (news article)
    const fields = (state) => ({
      name: state.name,
      url: state.url,
      image: state.image,
      contentUrl: state.image?.thumbnail?.contentUrl,
      description: state.description,
      provider: state.provider,
      datePublished: state.datePublished,
      category: state.category,
    });

    //Run composition function on each article
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

    //Remove the old news data that is real time from the database
    await News.destroy({ where: { realTime: true } });

    //Add the new data set to the  database
    await News.create({
      data: JSON.stringify(newsData),
      realTime: true,
    });
    console.log("Real Time News Refreshed.");
  } catch (error) {
    console.log(error);
  }
}

async function getHoursPastSinceNewsUpdate() {
  try {
    //Find the last updated time in the database for real time news
    const lastUpdatedTime = await News.findOne({
      where: { realTime: true },
      attributes: ["updatedAt"],
    });

    //If no news data was found at all, return 99 hours so server will update
    if (!lastUpdatedTime) {
      console.log("did not find a update time");
      return 99;
    }
    //Returns the amount of HOURS that have past since the last time REAL TIME news was updated
    return (
      Math.abs(
        Date.now() -
          (new Date(lastUpdatedTime.dataValues?.updatedAt).getTime() || 0)
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
