import { getType } from 'typesafe-actions';
import { TestScheduler } from 'rxjs/testing';
import * as actions from '../../actions';
import * as epics from '../CryptoEpic';
import { CryptoItem } from '../../types';

const mockCrypto: CryptoItem[] = [
  { id: 'bitcoin', current_price: 999, name: 'Bitcoin', symbol: 'btc', image: 'http://example.com/img.jpg' },
];

const testScheduler = new TestScheduler((actual, expected) => {
  return expect(actual).toEqual(expected);
});

describe('Test CryptoEpic', () => {
  beforeEach(() => {
    testScheduler.frame = 0;
  });
  describe('should handle actions.fetchCryptoAction.request', () => {
    it('success case', () => {
      testScheduler.run(({ hot, cold, expectObservable }) => {
        const action$ = hot('-a', {
          a: actions.fetchCryptoAction.request(),
        });
        const state$ = null;
        const dependencies = {
          getCrypto: () => cold('--a', { a: mockCrypto }),
        };
        const output$ = epics.cryptoGetEpic(
          // @ts-expect-error HotObservable can't pass into the ActionsObservable
          action$,
          state$,
          dependencies,
        );
        expectObservable(output$).toBe('---a', {
          a: { type: getType(actions.fetchCryptoAction.success), payload: mockCrypto, meta: 0 },
        });
      });
    });
    test('failure case', () => {
      testScheduler.run(({ hot, cold, expectObservable }) => {
        const action$ = hot('-a', {
          a: actions.fetchCryptoAction.request(),
        });
        const state$ = {};
        const dependencies = {
          getCrypto: () => cold('--#'),
        };
        const output$ = epics.cryptoGetEpic(
          // @ts-expect-error HotObservable can't pass into the ActionsObservable
          action$,
          state$,
          dependencies,
        );
        expectObservable(output$).toBe('---a', {
          a: {
            type: getType(actions.fetchCryptoAction.failure),
            payload: 'error',
          },
        });
      });
    });
  });
});
