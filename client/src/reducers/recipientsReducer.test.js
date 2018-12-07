import recipientsReducer from './recipientsReducer';
import {FETCH_RECIPIENTS} from '../actions/types';
// import {fetchRecipients} from '../actions/index';

// mock the response from the server
// pass the response to the reducer
// compare the reducer's response to the mock data

const getPostMock = {
    ownerId: 'abc123',
    name: 'Jimmy McNulty',
    email: 'jimmymcnulty@thewire.com'
};

describe('recipients reducer', () => {
    it('should return the initial state', () => {
        expect(recipientsReducer(undefined, {})).toEqual([]);
    });
    it('should handle FETCH_RECIPIENTS', () => {
        expect(recipientsReducer([], {type: FETCH_RECIPIENTS, payload: getPostMock})).toEqual(getPostMock);
    });
});