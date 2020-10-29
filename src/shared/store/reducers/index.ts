import { combineReducers } from 'redux';

import { cryptoReducer } from './CryptoReducer';
import { appReducer } from './AppReducer';

const reducers = combineReducers({
  crypto: cryptoReducer,
  app: appReducer,
});

export default reducers;
