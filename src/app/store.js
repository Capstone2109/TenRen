import { configureStore } from '@reduxjs/toolkit';
import { cryptoApi } from '../services/cryptoApi';
import { cryptoNewsApi } from '../services/cryptoNewsApi';
import dummyCryptoWorth from './trade';
import recentTransactions from './transactions';
import currentGames from './tradegame';

export default configureStore({
  reducer: {
    [cryptoApi.reducerPath]: cryptoApi.reducer,
    [cryptoNewsApi.reducerPath]: cryptoNewsApi.reducer,
    cryptoWorth: dummyCryptoWorth,
    recentTransactions,
    currentGames,
    
  },
})
