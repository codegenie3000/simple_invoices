import recipientsReducer from './recipientsReducer';
import { FETCH_RECIPIENTS } from '../actions/types';

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
        expect(recipientsReducer(undefined, {})).toEqual({
            recipients: [],
            isLoading: true
        });
    });
    it('should handle FETCH_RECIPIENTS', () => {
        expect(recipientsReducer(
            undefined, {
                type: FETCH_RECIPIENTS,
                payload: recipientData
            })).toEqual(
            {
                recipients: recipientData,
                isLoading: true
            });
    });
});