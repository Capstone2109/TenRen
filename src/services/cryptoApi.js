import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const cryptoApiHeaders = {
  'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
  'x-rapidapi-key': '7bed659c00msh43a443c538d73f0p1d7345jsn230e38afb912'
}

const baseUrl = 'https://coinranking1.p.rapidapi.com/';
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
      query: ({ coinId, timePeriod }) => createRequest(`coin/${coinId}/history/${timePeriod}`),
    }),
  })
});

export const {
  useGetCryptosQuery, useGetCryptoDetailsQuery, useGetCryptoHistoryQuery
  // Redux toolkit create the hook to fetch the data to all queryies
} = cryptoApi;
