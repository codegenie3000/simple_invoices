import configureMockStore from 'redux-mock-store';
// import promise from 'redux-promise';
//TODO change to redux-thunk
import axios from 'axios'
import reduxThunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import * as actions from './index';
import { FETCH_RECIPIENTS } from './types';

// import initialState
import { initialState } from '../reducers/recipientsReducer';

// const middlewares = [ promise ];
const middlewares = [ reduxThunk ];
const mockStore = configureMockStore(middlewares);

const mock = new MockAdapter(axios);

describe('initial state', () => {
    it('tests the initial state', () => {
        expect(initialState.isLoading).toEqual(true);
        expect(initialState.recipients.length).toEqual(0);
    });
});

// provide a reply to a get request to an API
// mock the API reply via mock = new MockAdapter(axios)

describe('test fetch recipients', () => {
    let store, expectedActions, data;

    beforeAll(() => {
        data = [ {
            name: 'Jimmy McNulty',
            balance: 1000.25,
            id: 'abc123'
        } ];

        mock.onGet('/api/recipients').reply(200, data);

        // create mock store
        store = mockStore(initialState);

        // create an expected reply to match to
        expectedActions = [
            {
                type: FETCH_RECIPIENTS, payload: [
                    {
                        name: 'Jimmy McNulty',
                        balance: 1000.25,
                        id: 'abc123'
                    }
                ]
            }
        ];
    });
    it('tests that the type is correct', () => {
        return store.dispatch(actions.fetchRecipients).then(() => {
            expect(store.getActions()[ 0 ].type).toEqual(expectedActions[ 0 ].type);

        });
    });
    it('tests the payload', ()=> {
        expect(store.getActions()[ 0 ].payload).toEqual(expectedActions[ 0 ].payload);
    });
});