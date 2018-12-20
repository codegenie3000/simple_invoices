import recipientsReducer from './recipientsReducer';
import { REQUEST_RECIPIENTS } from '../actions/types';
import {initialState} from './recipientsReducer';

const recipientData = [
    {
        ownerId: 'abc123',
        name: 'Jimmy McNulty',
        email: 'jimmymcnulty@thewire.com'
    },
    {
        ownerId: 'xyz456',
        name: 'Omar Little',
        email: 'omarlittle@thewire.com'
    }
];

describe('recipients reducer', () => {
    it('should return the initial state', () => {
        expect(recipientsReducer(undefined, {})).toEqual(initialState);
    });
    it('should handle REQUEST_RECIPIENTS', () => {
        expect(recipientsReducer(
            undefined, {
                type: REQUEST_RECIPIENTS,
                payload: recipientData
            })).toEqual(
            {
                recipients: recipientData,
                isLoading: true
            });
    });
});