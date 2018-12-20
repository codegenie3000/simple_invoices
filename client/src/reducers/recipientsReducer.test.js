import recipientsReducer from './recipientsReducer';
import { REQUEST_RECIPIENTS, RECEIVE_RECIPIENTS } from '../actions/types';
import { initialState } from './recipientsReducer';

const recipientData = [
    {
        id: 'recipientId123',
        ownerId: 'ownerId123',
        name: 'Jimmy McNulty',
        email: 'jimmymcnulty@thewire.com',
        invoices: [{id: 'invoiceId123'}]
    },
    {
        id: 'recipientId456',
        ownerId: 'ownerId456',
        name: 'Omar Little',
        email: 'omarlittle@thewire.com',
        invoices:[{id: 'invoiceId456'}]
    }
];

describe('initial state', () => {
    it('should return the initial state', () => {
        expect(recipientsReducer(undefined, {})).toEqual(initialState);
    });
});

describe('REQUEST_RECIPIENTS', () => {
    it('should return the correct data', () => {
        expect(recipientsReducer(undefined, {
            type: REQUEST_RECIPIENTS
        })).toEqual({
            recipients: [],
            isLoading: true
        });
    });
});

describe('RECEIVE_RECIPIENTS reducer', () => {
    it('should handle REQUEST_RECIPIENTS', () => {
        expect(recipientsReducer(
            undefined, {
                type: RECEIVE_RECIPIENTS,
                payload: recipientData
            })).toEqual(
            {
                recipients: recipientData,
                isLoading: false
            });
    });
});