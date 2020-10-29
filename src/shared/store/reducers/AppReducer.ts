import { createReducer } from 'typesafe-actions';
import { ActionsType } from '..';

import { setErrorsAction, unsetErrorsAction } from '../actions';
import { AppState } from '../types';

export const initialState = { errors: [] };

export const appReducer = createReducer<AppState, ActionsType>(initialState)
  .handleAction(unsetErrorsAction, (state, { payload }) => ({
    ...state,
    errors: payload,
  }))
  .handleAction(setErrorsAction, (state, { payload }) => ({
    ...state,
    errors: payload,
  }));
