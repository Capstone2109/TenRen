"use strict";
const axios = require("axios");
const {
    db,
    User,
    News,
  } = require("../server/db/index");
 /**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
    await db.sync({ force: true }); // clears db and matches models to tables`
    console.log("db synced!"); 
    
// Creating Users
  const users = await Promise.all([
    User.create({
      username: "cody@gmail.com",
      password: "123",
      isAdmin: true,
      userimageURL: "https://randomuser.me/api/portraits/men/75.jpg",
    }),
    User.create({
      username: "murphy@gmail.com",
      password: "123",
      isAdmin: false,
      userimageURL: "https://randomuser.me/api/portraits/men/50.jpg",
    }),
    User.create({
      username: "Mathilde@gmail.com",
      password: "123",
      isAdmin: false,
      userimageURL: "https://randomuser.me/api/portraits/women/65.jpg",
    }),
    User.create({
      username: "Jaleel@gmail.com",
      password: "123",
      isAdmin: false,
      userimageURL: "https://randomuser.me/api/portraits/men/55.jpg",
    }),
    User.create({
      username: "Jarrett@gmail.com",
      password: "123",
      isAdmin: false,
      userimageURL: "https://randomuser.me/api/portraits/men/60.jpg",
    }),
    User.create({
      username: "Asia@gmail.com",
      password: "123",
      isAdmin: false,
      userimageURL: "https://randomuser.me/api/portraits/women/60.jpg",
    }),
    User.create({
      username: "Helene@gmail.com",
      password: "123",
      isAdmin: false,
      userimageURL: "https://randomuser.me/api/portraits/women/70.jpg",
    }),
    User.create({
      username: "Krystina@gmail.com",
      password: "123",
      isAdmin: false,
      userimageURL: "https://randomuser.me/api/portraits/women/40.jpg",
    }),
    User.create({
      username: "Bernard@gmail.com",
      password: "123",
      isAdmin: false,
      userimageURL: "https://randomuser.me/api/portraits/men/30.jpg",
    }),
    User.create({
      username: "Destiney@gmail.com",
      password: "123",
      isAdmin: false,
      userimageURL: "https://randomuser.me/api/portraits/women/72.jpg",
    }),
    User.create({
      username: "Alvah@gmail.com",
      password: "123",
      isAdmin: false,
      userimageURL: "https://randomuser.me/api/portraits/women/73.jpg",
    }),
    User.create({
      username: "Myriam@gmail.com",
      password: "123",
      isAdmin: false,
      userimageURL: "https://randomuser.me/api/portraits/women/43.jpg",
    }),
  ]);

  // const arr = [
  //   {
  //     _type: "NewsArticle",
  //     name: "Metaverse won't be turning point in cryptocurrency adoption, investor Chesnais says",
  //     url: "https://finance.yahoo.com/news/metaverse-wont-turning-point-cryptocurrency-144804585.html",
  //     image: {
  //       _type: "ImageObject",
  //       thumbnail: {
  //         _type: "ImageObject",
  //         contentUrl: "https://www.bing.com/th?id=OVFT.zTz7mOMQAa7OPm4-zr9bBC&pid=News",
  //         width: 700,
  //         height: 446
  //       }
  //     },
  //     description: "The growth of online virtual worlds will help advance the mainstream adoption of cryptocurrencies for payment transactions but it won't be a game-changer, according to Frédéric Chesnais, chief executive of French fintech company Crypto Blockchain Industries.",
  //     about: [
  //       {
  //         _type: "Thing",
  //         readLink: "https://api.cognitive.microsoft.com/api/v7/entities/b1f0263f-b326-f867-ac77-06219865d595",
  //         name: "Metaverse"
  //       }
  //     ],
  //     provider: [
  //       {
  //         _type: "Organization",
  //         name: "YAHOO!Finance",
  //         image: {
  //           _type: "ImageObject",
  //           thumbnail: {
  //             _type: "ImageObject",
  //             contentUrl: "https://www.bing.com/th?id=ODF.fJDJ4f2BFbmOkQx_rnDw3Q&pid=news"
  //           }
  //         }
  //       }
  //     ],
  //     datePublished: "2021-12-02T14:48:00.0000000Z",
  //     category: "ScienceAndTechnology"
  //   },
  //   {
  //     _type: "NewsArticle",
  //     name: "Perpetual Industries Launches 506(c) Series A Preferred Share Offering for Stage One of Its Cryptocurrency Mining Division Expansion Plan",
  //     url: "https://finance.yahoo.com/news/perpetual-industries-launches-506-c-140000759.html",
  //     image: {
  //       _type: "ImageObject",
  //       thumbnail: {
  //         _type: "ImageObject",
  //         contentUrl: "https://www.bing.com/th?id=OVFT.gG8HHFBiw58DutQxF7K9cS&pid=News",
  //         width: 700,
  //         height: 345
  //       }
  //     },
  //     description: "Perpetual Industries seeks to raise $7 million from accredited investors interested in diversifying their investments in the fast-growing cryptocurrency mining industry with a Series A Preferred Share OfferingAUBURN,",
  //     about: [
  //       {
  //         _type: "Thing",
  //         readLink: "https://api.cognitive.microsoft.com/api/v7/entities/0e6a0688-c761-c7f9-b59b-a91515e7fd04",
  //         name: "Industry"
  //       },
  //       {
  //         _type: "Thing",
  //         readLink: "https://api.cognitive.microsoft.com/api/v7/entities/fa6b7571-3051-7379-9a33-9a559cad903e",
  //         name: "Mining"
  //       },
  //       {
  //         _type: "Thing",
  //         readLink: "https://api.cognitive.microsoft.com/api/v7/entities/4d57f5bf-e513-467a-90e6-b18a96600e37",
  //         name: "Cryptocurrency"
  //       }
  //     ],
  //     provider: [
  //       {
  //         _type: "Organization",
  //         name: "YAHOO!Finance",
  //         image: {
  //           _type: "ImageObject",
  //           thumbnail: {
  //             _type: "ImageObject",
  //             contentUrl: "https://www.bing.com/th?id=ODF.fJDJ4f2BFbmOkQx_rnDw3Q&pid=news"
  //           }
  //         }
  //       }
  //     ],
  //     datePublished: "2021-12-02T14:00:00.0000000Z",
  //     category: "Business"
  //   },
  //   {
  //     _type: "NewsArticle",
  //     name: "Here's My Top Cryptocurrency to Buy in December",
  //     url: "https://www.msn.com/en-us/money/markets/here-s-my-top-cryptocurrency-to-buy-in-december/ar-AARoeUH",
  //     image: {
  //       _type: "ImageObject",
  //       thumbnail: {
  //         _type: "ImageObject",
  //         contentUrl: "https://www.bing.com/th?id=OVFT.AP7slOVqF8qtpyzeNsdI3i&pid=News",
  //         width: 700,
  //         height: 367
  //       }
  //     },
  //     description: "Growth stocks are getting rattled. Bonds are offering a pittance in yield. Real estate could be risky once mortgage rates start to rise. Cryptocurrency is naturally more volatile than any of those conventional asset classes,",
  //     provider: [
  //       {
  //         _type: "Organization",
  //         name: "The Motley Fool on MSN.com",
  //         image: {
  //           _type: "ImageObject",
  //           thumbnail: {
  //             _type: "ImageObject",
  //             contentUrl: "https://www.bing.com/th?id=ODF.FPGiCjSpNWuR3YuGCSVHjA&pid=news"
  //           }
  //         }
  //       }
  //     ],
  //     datePublished: "2021-12-02T14:05:00.0000000Z",
  //     category: "ScienceAndTechnology"
  //   },
  //   {
  //     _type: "NewsArticle",
  //     name: "How to eliminate FOMO and stick to a cryptocurrency trading strategy",
  //     url: "https://cointelegraph.com/explained/how-to-eliminate-fomo-and-stick-to-a-cryptocurrency-trading-strategy",
  //     image: {
  //       _type: "ImageObject",
  //       thumbnail: {
  //         _type: "ImageObject",
  //         contentUrl: "https://www.bing.com/th?id=OVFT.NMeTHqJUf1JkQQD_CYhJry&pid=News",
  //         width: 700,
  //         height: 466
  //       }
  //     },
  //     description: "Automated, no-code tools can help investors stick to a strategy at times when it is easy for fear and greed to take over.",
  //     about: [
  //       {
  //         _type: "Thing",
  //         readLink: "https://api.cognitive.microsoft.com/api/v7/entities/3295fada-5a0e-8d4b-7e78-9ac9af4f6f37",
  //         name: "Trading strategy"
  //       }
  //     ],
  //     provider: [
  //       {
  //         _type: "Organization",
  //         name: "CoinTelegraph",
  //         image: {
  //           _type: "ImageObject",
  //           thumbnail: {
  //             _type: "ImageObject",
  //             contentUrl: "https://www.bing.com/th?id=ODF.KlSntIYhxrABbaYBAsfZ8Q&pid=news"
  //           }
  //         }
  //       }
  //     ],
  //     datePublished: "2021-12-02T16:06:00.0000000Z",
  //     category: "ScienceAndTechnology"
  //   },
  //   {
  //     _type: "NewsArticle",
  //     name: "Fraudsters hack social media accounts for cryptocurrency scams",
  //     url: "https://news.yahoo.com/fraudsters-hack-social-media-accounts-142445170.html",
  //     image: {
  //       _type: "ImageObject",
  //       thumbnail: {
  //         _type: "ImageObject",
  //         contentUrl: "https://www.bing.com/th?id=OVFT.91ZhN3LtTNQBxjoMv7tHry&pid=News",
  //         width: 700,
  //         height: 393
  //       }
  //     },
  //     description: "Using hacked social media profiles the fraudsters use people's name and likeness to begin posting messages in an attempt to trick followers into entering into a money making opportunity with cryptocurrency.",
  //     about: [
  //       {
  //         _type: "Thing",
  //         readLink: "https://api.cognitive.microsoft.com/api/v7/entities/774fc83b-059a-48ee-a99a-2f70f1cee025",
  //         name: "Fraud"
  //       },
  //       {
  //         _type: "Thing",
  //         readLink: "https://api.cognitive.microsoft.com/api/v7/entities/4ce177ea-a99f-5e40-7159-82f7b5581be3",
  //         name: "Social media"
  //       }
  //     ],
  //     provider: [
  //       {
  //         _type: "Organization",
  //         name: "YAHOO!News",
  //         image: {
  //           _type: "ImageObject",
  //           thumbnail: {
  //             _type: "ImageObject",
  //             contentUrl: "https://www.bing.com/th?id=ODF.nYADEgS75l8rdCg9D-p_OQ&pid=news"
  //           }
  //         }
  //       }
  //     ],
  //     datePublished: "2021-12-02T14:24:00.0000000Z"
  //   },
  //   {
  //     _type: "NewsArticle",
  //     name: "Five Not-So-Well-Known Cryptocurrency Alternatives To Bitcoin",
  //     url: "https://ibtimes.com/five-not-so-well-known-cryptocurrency-alternatives-bitcoin-3349713",
  //     image: {
  //       _type: "ImageObject",
  //       thumbnail: {
  //         _type: "ImageObject",
  //         contentUrl: "https://www.bing.com/th?id=OVFT.6Tolds6hp3PFd5tLxnyfbi&pid=News",
  //         width: 245,
  //         height: 163
  //       }
  //     },
  //     description: "Although not as popular as Bitcoin or Ethereum, the less well-known cryptos like Solana, Avalanche, and Axie Infinity offer solid returns to crypto investors.",
  //     about: [
  //       {
  //         _type: "Thing",
  //         readLink: "https://api.cognitive.microsoft.com/api/v7/entities/15cbd389-cade-c7a9-66d0-13f34d5a06aa",
  //         name: "Alternatives"
  //       },
  //       {
  //         _type: "Thing",
  //         readLink: "https://api.cognitive.microsoft.com/api/v7/entities/4d57f5bf-e513-467a-90e6-b18a96600e37",
  //         name: "Cryptocurrency"
  //       },
  //       {
  //         _type: "Thing",
  //         readLink: "https://api.cognitive.microsoft.com/api/v7/entities/2d95ee9c-a8a0-d6fa-69b7-f6d996f0c946",
  //         name: "Bitcoin"
  //       }
  //     ],
  //     provider: [
  //       {
  //         _type: "Organization",
  //         name: "International Business Times",
  //         image: {
  //           _type: "ImageObject",
  //           thumbnail: {
  //             _type: "ImageObject",
  //             contentUrl: "https://www.bing.com/th?id=ODF.2u8k6DPMmiNV3kL0MkuH6g&pid=news"
  //           }
  //         }
  //       }
  //     ],
  //     datePublished: "2021-12-02T09:23:00.0000000Z",
  //     category: "ScienceAndTechnology"
  //   },
  //   {
  //     _type: "NewsArticle",
  //     name: "Facebook retreats from crypto ad ban",
  //     url: "https://www.cnbc.com/2021/12/01/facebook-ends-ban-on-cryptocurrency-ads.html",
  //     image: {
  //       _type: "ImageObject",
  //       thumbnail: {
  //         _type: "ImageObject",
  //         contentUrl: "https://www.bing.com/th?id=OVFT.UTreJHBV48ig_I6L7LFfLC&pid=News",
  //         width: 700,
  //         height: 442
  //       }
  //     },
  //     description: "Facebook on Wednesday announced its decision to reverse long-standing policy that prevented most cryptocurrency companies from running ads on its services.",
  //     mentions: [
  //       {
  //         _type: "Thing",
  //         name: "Cryptocurrency"
  //       },
  //       {
  //         _type: "Thing",
  //         name: "Retreat"
  //       },
  //       {
  //         _type: "Thing",
  //         name: "Currency"
  //       }
  //     ],
  //     provider: [
  //       {
  //         _type: "Organization",
  //         name: "CNBC",
  //         image: {
  //           _type: "ImageObject",
  //           thumbnail: {
  //             _type: "ImageObject",
  //             contentUrl: "https://www.bing.com/th?id=ODF.k-6pjyk-qP1jNZnkgM3f3A&pid=news"
  //           }
  //         }
  //       }
  //     ],
  //     datePublished: "2021-12-02T00:37:00.0000000Z",
  //     video: {
  //       _type: "VideoObject",
  //       name: "Facebook and Amazon remain two of my top stock picks: Evercore's Mark Mahaney",
  //       motionThumbnailUrl: "https://prod-streaming-video-msn-com.akamaized.net/7fd94ff3-9f05-4ac7-a4fe-7ed216f6c672/7a7ff34a-6aa9-450d-89da-0185b4a1_650.mp4",
  //       thumbnail: {
  //         _type: "ImageObject",
  //         width: 640,
  //         height: 360
  //       }
  //     }
  //   },
  //   {
  //     _type: "NewsArticle",
  //     name: "Locked out of traditional financial industry, more people of color are turning to cryptocurrency",
  //     url: "https://www.seattletimes.com/business/locked-out-of-traditional-financial-industry-more-people-of-color-are-turning-to-cryptocurrency/",
  //     image: {
  //       _type: "ImageObject",
  //       thumbnail: {
  //         _type: "ImageObject",
  //         contentUrl: "https://www.bing.com/th?id=OVFT.ML2taYTvh7XENOit7UG0FS&pid=News",
  //         width: 700,
  //         height: 367
  //       }
  //     },
  //     description: "It wasn't their dog-walking business, or the food stand, or their decision to drop out of college that ended up saving the Lopez twins' parents from financial ruin when the two mortgages on their home became too much.",
  //     provider: [
  //       {
  //         _type: "Organization",
  //         name: "Seattle Times",
  //         image: {
  //           _type: "ImageObject",
  //           thumbnail: {
  //             _type: "ImageObject",
  //             contentUrl: "https://www.bing.com/th?id=ODF.fpemrnMQqt6geHmUwb0LPQ&pid=news"
  //           }
  //         }
  //       }
  //     ],
  //     datePublished: "2021-12-01T23:19:00.0000000Z"
  //   },
  //   {
  //     _type: "NewsArticle",
  //     name: "Cryptocurrency executives to be questioned in Congress",
  //     url: "https://www.bbc.co.uk/news/business-59496509?ns_ns_campaign=bbc_live&pinned_post_locator=urn:bbc:cps:curie:asset:ff1a4a04-beea-4699-90b4-18370abe20ee&pinned_post_asset_id=59496509&pinned_post_type=share",
  //     image: {
  //       _type: "ImageObject",
  //       thumbnail: {
  //         _type: "ImageObject",
  //         contentUrl: "https://www.bing.com/th?id=OVFT.5hsKbvwb9achyy5sT4Fefy&pid=News",
  //         width: 700,
  //         height: 393
  //       }
  //     },
  //     description: "Executives of eight major cryptocurrency firms have been called to testify before a US congressional committee on 8 December. Witnesses called to appear include Coinbase's, Circle's Jeremy Allaire and Bitfury's Brian Brooks.",
  //     provider: [
  //       {
  //         _type: "Organization",
  //         name: "BBC",
  //         image: {
  //           _type: "ImageObject",
  //           thumbnail: {
  //             _type: "ImageObject",
  //             contentUrl: "https://www.bing.com/th?id=ODF.yhngt24TSWuyw3ur0Pt3WQ&pid=news"
  //           }
  //         }
  //       }
  //     ],
  //     datePublished: "2021-12-02T00:02:00.0000000Z"
  //   },
  //   {
  //     _type: "NewsArticle",
  //     name: "Facebook Changes Course, Will Allow More Cryptocurrency Ads",
  //     url: "https://www.ibtimes.com/facebook-changes-course-will-allow-more-cryptocurrency-ads-3349359",
  //     image: {
  //       _type: "ImageObject",
  //       thumbnail: {
  //         _type: "ImageObject",
  //         contentUrl: "https://www.bing.com/th?id=OVFT.6kiwiMV-o7cBMntHSFbiPi&pid=News",
  //         width: 700,
  //         height: 466
  //       }
  //     },
  //     description: "In a reversal from its past policy, Meta Platforms Inc., formerly known as Facebook Inc., announced Wednesday that it would expand eligibility requirements for running cryptocurrency advertisements The company banned cryptocurrency ads in January 2018 but scaled back that ban slightly in May 2019.",
  //     about: [
  //       {
  //         _type: "Thing",
  //         readLink: "https://api.cognitive.microsoft.com/api/v7/entities/4d57f5bf-e513-467a-90e6-b18a96600e37",
  //         name: "Cryptocurrency"
  //       }
  //     ],
  //     provider: [
  //       {
  //         _type: "Organization",
  //         name: "International Business Times",
  //         image: {
  //           _type: "ImageObject",
  //           thumbnail: {
  //             _type: "ImageObject",
  //             contentUrl: "https://www.bing.com/th?id=ODF.2u8k6DPMmiNV3kL0MkuH6g&pid=news"
  //           }
  //         }
  //       }
  //     ],
  //     datePublished: "2021-12-02T00:03:00.0000000Z"
  //   },
  //   {
  //     _type: "NewsArticle",
  //     name: "Meta allows more cryptocurrency ads",
  //     url: "https://news.yahoo.com/meta-facebook-ends-cryptocurrency-ad-ban-203807508.html",
  //     image: {
  //       _type: "ImageObject",
  //       thumbnail: {
  //         _type: "ImageObject",
  //         contentUrl: "https://www.bing.com/th?id=OVFT.XlxpyrDRMrqL9uzCHRMoTC&pid=News",
  //         width: 700,
  //         height: 467
  //       }
  //     },
  //     description: "Meta has greatly loosened its ban on cryptocurrency ads after deciding the digital money landscape has improved.",
  //     provider: [
  //       {
  //         _type: "Organization",
  //         name: "YAHOO!News",
  //         image: {
  //           _type: "ImageObject",
  //           thumbnail: {
  //             _type: "ImageObject",
  //             contentUrl: "https://www.bing.com/th?id=ODF.nYADEgS75l8rdCg9D-p_OQ&pid=news"
  //           }
  //         }
  //       }
  //     ],
  //     datePublished: "2021-12-01T20:38:00.0000000Z",
  //     category: "ScienceAndTechnology"
  //   },
  //   {
  //     _type: "NewsArticle",
  //     name: "Really stupid “smart contract” bug let hackers steal $31 million in digital coin",
  //     url: "https://arstechnica.com/information-technology/2021/12/hackers-drain-31-million-from-cryptocurrency-service-monox-finance/",
  //     image: {
  //       _type: "ImageObject",
  //       thumbnail: {
  //         _type: "ImageObject",
  //         contentUrl: "https://www.bing.com/th?id=OVFT.p2kX3DVWthQMdBmqkaJYsS&pid=News",
  //         width: 700,
  //         height: 465
  //       }
  //     },
  //     description: "Blockchain startup MonoX Finance said on Wednesday that a hacker stole $31 million by exploiting a bug in software the service uses to draft smart contracts. The company uses a decentralized finance protocol known as MonoX that lets users trade digital currency tokens without some of the requirements of traditional exchanges.",
  //     provider: [
  //       {
  //         _type: "Organization",
  //         name: "Ars Technica",
  //         image: {
  //           _type: "ImageObject",
  //           thumbnail: {
  //             _type: "ImageObject",
  //             contentUrl: "https://www.bing.com/th?id=ODF.ujb7xrXKIzzWUeiq3sEXxg&pid=news"
  //           }
  //         }
  //       }
  //     ],
  //     datePublished: "2021-12-01T23:41:00.0000000Z",
  //     category: "ScienceAndTechnology"
  //   }
  // ]
  
  // const stringArr = JSON.stringify(arr)

  // await News.create({
  //   category: "AllNews",
  //   data: stringArr,
  // });

  // const news = await News.findOne({
  //   where: {
  //     realTime: true
  //   }
  // });

  // const allNews = JSON.parse(news.dataValues.data);

  // console.log(allNews);


  const apiData = await getApiData()
  

  await News.create({
    category: "AllNews",
    data: JSON.stringify(apiData),
  });

   const db_news = await News.findOne({
    where: {
      realTime: true
    }
  });

  const allNewsDB = JSON.parse(db_news.dataValues.data);

  console.log(allNewsDB);


}
const categories = ["Bitcoin","eCash"]
const options = {
  method: 'GET',
  url: 'https://bing-news-search1.p.rapidapi.com/news/search',
  params: {
      safeSearch: 'Off',
       textFormat: 'Raw',
       count: '2',
       freshness: 'Day',
      },
  headers: {
      'x-bingapis-sdk': 'true',
      'x-rapidapi-host': 'bing-news-search1.p.rapidapi.com',
      'x-rapidapi-key': '3c7ef0dfd5msheac71ccb6cc560ep103353jsnb101d0407034'
    }
};

async function getApiData(){
  try {
    let info = await Promise.all(categories.map( cat => axios.request({...options, params:{...options.params, q: cat} }) ))
    info = info.map( e => e.data.value)

    info = info.reduce( (prev,current)=> {
        current.forEach(element => {
            prev.push(element)
        });
        return prev
    },[])
    return info
  } catch (error) {
      console.log(error)
  }
}

  /*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
    console.log("seeding...");
    try {
      await seed();
      
    } catch (err) {
      console.error(err);
      process.exitCode = 1;
    } finally {
      console.log("closing db connection");
      await db.close();
      console.log("db connection closed");
    }
  }
  
  /*
    Execute the `seed` function, IF we ran this module directly (`node seed`).
    `Async` functions always return a promise, so we can use `catch` to handle
    any errors that might occur inside of `seed`.
  */
  if (module === require.main) {
    runSeed();
  }
  
  // we export the seed function for testing purposes (see `./seed.spec.js`)
  module.exports = seed;