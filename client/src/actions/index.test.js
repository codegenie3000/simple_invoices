import configureMockStore from 'redux-mock-store';
import axios from 'axios'
import reduxThunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';

import * as actions from './index';
import { REQUEST_RECIPIENTS, RECEIVE_RECIPIENTS } from './types';
// import initialState
import { initialState } from '../reducers/recipientsReducer';

// const middlewares = [ promise ];
const middlewares = [ reduxThunk ];
const mockStore = configureMockStore(middlewares);

const mock = new MockAdapter(axios);

describe('initial state', () => {
    it('tests the initial state', () => {
        expect(initialState.isLoading).toEqual(false);
        expect(initialState.recipients.length).toEqual(0);
    });
});

describe('requestRecipients', () => {
    let store, expectedActions;

    beforeAll(() => {
        store = mockStore(initialState);

        expectedActions = [
            {
                type: REQUEST_RECIPIENTS
            }
        ];
    });
    it('matches type', () => {
        store.dispatch(actions.requestRecipients());
        expect(store.getActions()[0].type).toEqual(expectedActions[0].type);
    });
});

describe('receiveRecipients', () => {
    let store, expectedActions, data;

    beforeAll(() => {
        data = [ {
            name: 'Jimmy McNulty',
            balance: 1000.25,
            id: 'abc123'
        } ];

        store = mockStore(initialState);

        expectedActions = [
            {
                type: RECEIVE_RECIPIENTS,
                payload: data
            }
        ];
    });
    it('tests the type', () => {
        store.dispatch(actions.receiveRecipients());
        expect(store.getActions()[0].type).toEqual(expectedActions[0].type);
    });
});

describe('fetchRecipients async', () => {
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
                type: REQUEST_RECIPIENTS
            },
            {
                type: RECEIVE_RECIPIENTS,
                payload: [
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
            const storeActions = store.getActions();
            expect(storeActions[0].type).toEqual(expectedActions[0].type);
            expect(storeActions[1].type).toEqual(expectedActions[1].type);
        });
    });
    it('tests the payload', () => {
        return store.dispatch(actions.fetchRecipients).then(() => {
            const storeActions = store.getActions();
            expect(storeActions[1].payload).toEqual(expectedActions[1].payload);
        });
    });
});