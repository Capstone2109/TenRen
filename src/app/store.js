import { configureStore } from '@reduxjs/toolkit';
import { cryptoApi } from '../services/cryptoApi';
import { cryptoNewsApi } from '../services/cryptoNewsApi';
import tradeReducer, { dummyCryptoWorth, dollarOwned, userInfo } from './trade';
import recentTransactions from './transactions';
import tradeGames
 from './tradegame';
export default configureStore({
  reducer: {
    [cryptoApi.reducerPath]: cryptoApi.reducer,
    [cryptoNewsApi.reducerPath]: cryptoNewsApi.reducer,
    ownedCrypto: tradeReducer,
    dollarOwned: dollarOwned,
    cryptoWorth: dummyCryptoWorth,
    userInfo,
    recentTransactions,
    tradeGames,
    
  },
})
