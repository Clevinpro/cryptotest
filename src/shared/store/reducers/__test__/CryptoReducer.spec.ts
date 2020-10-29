import * as actions from '../../actions';
import { CryptoItem } from '../../types';
import { cryptoReducer as reducer, initialState } from '../CryptoReducer';

const mockCrypto: CryptoItem[] = [
  { id: 'bitcoin', current_price: 999, name: 'Bitcoin', symbol: 'btc', image: 'http://example.com/img.jpg' },
];

describe('Test CryptoReducer', () => {
  test('should return the initial state', () => {
    // @ts-expect-error set null action
    expect(reducer(undefined, {})).toEqual(initialState);
  });
  test('should handle actions.fetchCryptoAction.request', () => {
    expect(reducer(initialState, actions.fetchCryptoAction.request())).toEqual({
      items: [],
      isLoaded: false,
    });
  });
  test('should handle actions.fetchCryptoAction.success', () => {
    expect(reducer({ ...initialState, isLoaded: false }, actions.fetchCryptoAction.success(mockCrypto))).toEqual({
      items: mockCrypto,
      isLoaded: true,
    });
  });
  test('should handle actions.fetchCryptoAction.failure', () => {
    expect(
      reducer({ ...initialState, isLoaded: false }, actions.fetchCryptoAction.failure(new Error('error'))),
    ).toEqual({
      items: [],
      isLoaded: true,
    });
  });
});
