const axios = require('axios');

const cat = ["Bitcoin"]

console.log("Works?");

const options = {
    method: 'GET',
    url: 'https://bing-news-search1.p.rapidapi.com/',
    params:{
        safeSearch: "Off",
        textFormat: "Raw",
        count: "5",
        q: cat,
        freshness: "Day",
    },
    headers: {
        'x-bingapis-sdk': 'true',
        'x-rapidapi-host': 'bing-news-search1.p.rapidapi.com',
        'x-rapidapi-key': '7bed659c00msh43a443c538d73f0p1d7345jsn230e38afb912'
    }
}


axios.request(options)
    .then(function (response) {
        console.log(response.data.value);
    })
    .catch(function (error) {
        console.log(error);
    }   );

