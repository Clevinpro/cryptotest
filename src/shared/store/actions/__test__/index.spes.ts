import { CryptoItem, ErrorProps } from './../../types';
import * as actions from '../';
import { getType } from 'typesafe-actions';

const mockCrypto: CryptoItem[] = [
  { id: 'bitcoin', current_price: 999, name: 'Bitcoin', symbol: 'btc', image: 'http://example.com/img.jpg' },
];

const mockError: ErrorProps = {
  id: Date.now(),
  message: `Sorry, but "Bitcoin" already in favorites`,
  description: 'Please, chose another one for adding to favorites',
  type: 'warning',
  isOpen: true,
};

describe('Test Action creators', function () {
  test('should create an action to get a crypto', () => {
    const expectedAction = {
      type: getType(actions.fetchCryptoAction.request),
    };
    expect(actions.fetchCryptoAction.request()).toEqual(expectedAction);
  });

  test('should create an action for success getting crypto', () => {
    const expectedAction = {
      type: getType(actions.fetchCryptoAction.success),
      payload: mockCrypto,
    };
    expect(actions.fetchCryptoAction.success(mockCrypto)).toEqual(expectedAction);
  });

  test('should create an action for failure getting crypto', () => {
    const expectedAction = {
      type: getType(actions.fetchCryptoAction.failure),
      payload: new Error('error'),
    };
    expect(actions.fetchCryptoAction.failure(new Error('error'))).toEqual(expectedAction);
  });

  test('should create an action for error handle', () => {
    const expectedAction = {
      type: getType(actions.setErrorAction),
      payload: mockError,
    };
    expect(actions.setErrorAction(mockError)).toEqual(expectedAction);
  });

  test('should create an action for set errors ', () => {
    const expectedAction = {
      type: getType(actions.setErrorsAction),
      payload: [mockError, mockError],
    };
    expect(actions.setErrorsAction([mockError, mockError])).toEqual(expectedAction);
  });

  test('should create an action for unset errors ', () => {
    const expectedAction = {
      type: getType(actions.unsetErrorsAction),
      payload: [mockError, mockError],
    };
    expect(actions.unsetErrorsAction([mockError, mockError])).toEqual(expectedAction);
  });
});
