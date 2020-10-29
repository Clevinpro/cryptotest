import { combineEpics } from 'redux-observable';

import cryptoEpic from './CryptoEpic';
import appEpic from './AppEpic';

const epics = combineEpics(...cryptoEpic, ...appEpic);

export default epics;
