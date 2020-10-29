import { createSelector } from 'reselect';
import { getState } from './appSelectors';

export const getCryptoState = createSelector(getState, ({ crypto }) => crypto);
