const axios = require('axios')
const categories = ["bitcoin","ethereum"]

const options = {
  method: 'GET',
  url: 'https://bing-news-search1.p.rapidapi.com/news/search',
  params: {
      safeSearch: 'Off',
       textFormat: 'Raw',
       count: '12',
       freshness: 'Day',
      },
  headers: {
      'x-bingapis-sdk': 'true',
      'x-rapidapi-host': 'bing-news-search1.p.rapidapi.com',
      'x-rapidapi-key': '3c7ef0dfd5msheac71ccb6cc560ep103353jsnb101d0407034'
    }
};

async function getNewsFromApi(){
    try {
        let info = await Promise.all(
          categories.map(async (cat) => {
            let data = await axios.request({ ...options, params: { ...options.params, q: cat } })
            const obj = {category: cat, data: data.data.value };
            return obj
          }
          )
        );
    
        const fields = (state) => ({
          name: state.name,
          url: state.url,
          contentUrl: state.image?.thumbnail?.contentUrl,
          description: state.description,
          provider: state.provider,
          datePublished: state.datePublished,
          category: state.category,
        });
    
        info = info.map(objCat => {
          const data = objCat.data.map(obj => fields(obj));
          return {category: objCat.category, data}
        })
        
        return info;
      } catch (error) {
        console.log(error);
      }
}

module.exports = getNewsFromApi