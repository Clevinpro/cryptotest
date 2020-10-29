import { applyMiddleware, createStore } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { ActionType } from 'typesafe-actions';
import { composeWithDevTools } from 'redux-devtools-extension';

import * as API from '../services/Api';
import * as actions from './actions';
import epics from './epics';
import reducers from './reducers';
import { Store } from './types';
import { ROOT_STORE_INITIAL } from '../constants';

export type ActionsType = ActionType<typeof actions>;

const epicMiddleware = createEpicMiddleware<ActionsType, ActionsType, Store>({
  dependencies: API,
});

function configureStore(initialState: Store) {
  const middlewares = [epicMiddleware];

  const enhancer = composeWithDevTools(applyMiddleware(...middlewares));

  return createStore(reducers, initialState, enhancer);
}

export const store = configureStore(ROOT_STORE_INITIAL);

epicMiddleware.run(epics);
