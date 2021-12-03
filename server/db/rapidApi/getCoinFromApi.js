import axios from "axios";

let options = {
  method: 'GET',
  url: 'https://coinranking1.p.rapidapi.com/exchanges',
  headers: {
    'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
    'x-rapidapi-key': 'f6ed2103e1msh1b57104c8a32539p12d792jsna87434a146d0'
  }
};



export default async function getCoinApi (){
    try {
        let coinInfo = await axios.request(options)
        return coinInfo;
    } catch (error) {
        throw error;
    }
}

// axios.request(options).then(function (response) {
// 	console.log(response.data);
// }).catch(function (error) {
// 	console.error(error);
// });