//TODO implement a save changes reducer and action
import { REQUEST_RECIPIENTS } from '../actions/types';
import { RECEIVE_RECIPIENTS } from '../actions/types';

export const initialState = {
    recipients: [],
    isLoading: false
};

// Original before adding isLoading
/*
export default (state = initialState, action) => {
    switch (action.type) {
        case REQUEST_RECIPIENTS:
            return Object.assign({}, state, {
                recipients: action.payload,
                isLoading: true
            });
        default:
            return state;
    }
}*/

// new with isLoading

export default (state = initialState, action) => {
    switch (action.type) {
        case REQUEST_RECIPIENTS:
            return Object.assign({}, state, {
                isLoading: true
            });
        case RECEIVE_RECIPIENTS:
            return Object.assign({}, state, {
                recipients: action.payload,
                isLoading: false
            });
        default:
            return state;
    }
}