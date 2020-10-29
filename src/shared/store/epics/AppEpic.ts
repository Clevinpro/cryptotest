import { Epic } from 'redux-observable';
import { filter, map, delay, withLatestFrom } from 'rxjs/operators';
import { isActionOf } from 'typesafe-actions';

import { Store } from '../types';
import { ActionsType } from '..';
import { setErrorAction, setErrorsAction, unsetErrorsAction } from '../actions';
import * as API from '../../services/Api';
import { getErrorsState } from '../../selectors/appSelectors';

export const setErrorEpic: Epic<ActionsType, ActionsType, Store, typeof API> = (action$, state$) =>
  action$.pipe(
    filter(isActionOf(setErrorAction)),
    withLatestFrom(state$),
    map(([action, state]) => {
      return setErrorsAction([...state.app.errors, action.payload]);
    }),
  );

export const unsetErrorEpic: Epic<ActionsType, ActionsType, Store, typeof API> = (action$, state$) =>
  action$.pipe(
    filter(isActionOf(setErrorsAction)),
    delay(2000),
    withLatestFrom(state$),
    map(([action, state]) => {
      // getting the final state because another error is possible at this time
      const errors = getErrorsState(state);
      // getting the last bug when it’s initialized. Payload can be with 2 elements while the state is already with 3
      const lastItemOfCurrentErrs = action.payload.length - 1;
      const currentErrId = action.payload[lastItemOfCurrentErrs].id;
      // updating state of current error
      const updErrors = errors.map((err) => {
        if (err.id === currentErrId) {
          return {
            ...err,
            isOpen: false,
          };
        }
        return err;
      });
      return unsetErrorsAction(updErrors);
    }),
  );

export default [setErrorEpic, unsetErrorEpic];
