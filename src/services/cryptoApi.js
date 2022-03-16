import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const cryptoApiHeaders = {
  'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
  // 'x-rapidapi-host': 'https://api.coinranking.com/v2',
  'x-access-token':'coinrankingbf379f5ddc4f26483b931c9b36cab2918748513b0e371916',
  'x-rapidapi-key': '9973d4d458msh3093964e4eb1947p12b1b1jsn021aaeb8292e'
  // old key
  // 'x-rapidapi-key': '7bed659c00msh43a443c538d73f0p1d7345jsn230e38afb912'
}

const baseUrl = 'https://coinranking1.p.rapidapi.com'

// const baseUrl = 'https://api.coinranking.com/';
// var options = {
//   method: 'GET',
//   url: 'https://coinranking1.p.rapidapi.com/exchanges',
//   headers: {
//     'x-rapidapi-host': 'coinranking1.p.rapidapi.com/',
//     'x-rapidapi-key': '7bed659c00msh43a443c538d73f0p1d7345jsn230e38afb912'
//   }
// };

const createRequest = (url) => ({
  url, headers: cryptoApiHeaders
})

export const cryptoApi = createApi({
  reducerPath: 'cryptoApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptos: builder.query({
      query: (count) => createRequest(`/coins?limit=${count}`),

    }),

    getCryptoDetails: builder.query({
      query: (coinId) => createRequest(`/coin/${coinId}`),
    }),
    getCryptoHistory: builder.query({
      // query: ({ coinId, timePeriod }) => createRequest(`coin/${coinId}/history/${timePeriod}`),
      query: ({ coinId, timePeriod }) => createRequest(`coin/${coinId}/history?timePeriod=${timePeriod}`),
    }),
  })
});

export const {
  useGetCryptosQuery, useGetCryptoDetailsQuery, useGetCryptoHistoryQuery,
  // Redux toolkit create the hook to fetch the data to all queries
} = cryptoApi;
