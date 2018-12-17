//TODO implement a save changes reducer and action
import { FETCH_RECIPIENTS } from '../actions/types';

export const initialState = {
    recipients: [],
    isLoading: true
};

export default (state = initialState, action) => {
    switch (action.type) {
        case FETCH_RECIPIENTS:
            return Object.assign({}, state,  {
                recipients: action.payload,
            });
        default:
            return state;
    }
}