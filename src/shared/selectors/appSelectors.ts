import { createSelector } from 'reselect';

import { Store } from '../store/types';

export const getState = (state: Store): Store => state;
export const getAppState = createSelector(getState, ({ app }) => app);
export const getErrorsState = createSelector(getAppState, ({ errors }) => errors);
