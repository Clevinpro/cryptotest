import { createReducer } from 'typesafe-actions';
import { ActionsType } from '..';

import { fetchCryptoAction } from '../actions';
import { CryptoState } from '../types';

export const initialState = { items: [], isLoaded: true };

export const cryptoReducer = createReducer<CryptoState, ActionsType>(initialState)
  .handleAction(fetchCryptoAction.request, (state) => ({
    ...state,
    isLoaded: false,
  }))
  .handleAction(fetchCryptoAction.success, (state, action) => ({
    ...state,
    items: action.payload,
    isLoaded: true,
  }))
  .handleAction(fetchCryptoAction.failure, (state, action) => {
    console.error(action.payload);
    return { ...state, isLoaded: true };
  });
