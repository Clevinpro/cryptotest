import { Epic } from 'redux-observable';
import { from, of } from 'rxjs';
import { exhaustMap, filter, map, catchError } from 'rxjs/operators';
import { isActionOf } from 'typesafe-actions';

import { Store } from '../types';
import { ActionsType } from '..';
import { fetchCryptoAction } from '../actions';
import * as API from '../../services/Api';

export const cryptoGetEpic: Epic<ActionsType, ActionsType, Store, typeof API> = (action$, store, { getCrypto }) =>
  action$.pipe(
    filter(isActionOf(fetchCryptoAction.request)),
    exhaustMap(() =>
      from(getCrypto()).pipe(
        map(fetchCryptoAction.success),
        catchError((error) => of(fetchCryptoAction.failure(error))),
      ),
    ),
  );

export default [cryptoGetEpic];
