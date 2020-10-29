import { createAsyncAction, createAction } from 'typesafe-actions';
import { CryptoItem, ErrorProps } from '../types';

export const fetchCryptoAction = createAsyncAction(
  'FETCH_CRYPTO_REQUEST',
  'FETCH_CRYPTO_SUCCESS',
  'FETCH_CRYPTO_FAILURE',
)<void, CryptoItem[], Error>();

export const setErrorAction = createAction('SET_ERROR')<ErrorProps>();
export const setErrorsAction = createAction('SET_ERRORS')<ErrorProps[]>();
export const unsetErrorsAction = createAction('UNSET_ERRORS')<ErrorProps[]>();
