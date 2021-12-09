import { configureStore } from '@reduxjs/toolkit';
import { cryptoApi } from '../services/cryptoApi';
import { cryptoNewsApi } from '../services/cryptoNewsApi';
import {cryptoWorth} from './tradegame';
import recentTransactions from './transactions';
import currentGames from './tradegame';

export default configureStore({
  reducer: {
    [cryptoApi.reducerPath]: cryptoApi.reducer,
    [cryptoNewsApi.reducerPath]: cryptoNewsApi.reducer,
    cryptoWorth,
    recentTransactions,
    currentGames,
    
  },
})
