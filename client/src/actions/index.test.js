import configureMockStore from 'redux-mock-store';
import promise from 'redux-promise';
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter';
import * as actions from './index';
import { FETCH_RECIPIENTS } from './types';

const middlewares = [ promise ];

const mockStore = configureMockStore(middlewares);

const mock = new MockAdapter(axios);

describe('actions', () => {
    it('fetches the recipients', () => {
        mock.onGet('/api/recipients', {}).reply(200, [
            {
                ownerId: 'abc123',
                name: 'Jimmy McNulty',
                email: 'jimmymcnulty@thewire.com'
            }
        ]);

        const expectedActions = {
            type: FETCH_RECIPIENTS,
            payload: [ {
                ownerId: 'abc123',
                name: 'Jimmy McNulty',
                email: 'jimmymcnulty@thewire.com'
            } ]
        };

        const store = mockStore({ recipients: [] });

        return store.dispatch(actions.fetchRecipients()).then(() => {
            const actions = store.getActions();
            expect(expectedActions.type).toEqual(actions[ 0 ].type);
            expect(expectedActions.payload[ 0 ]).toEqual(actions[ 0 ].payload.data[ 0 ]);
        });
    });
});
