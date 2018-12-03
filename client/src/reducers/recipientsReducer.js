import {FETCH_RECIPIENTS} from '../actions/types';

/*
export default function(state = [], action) {
    switch(action.type) {
        case FETCH_RECIPIENTS:
            return action.payload;
        default:
            return state;
    }
}*/

// for development purposes
export default function() {
    return [
        {
            name: 'Jimmy McNulty',
            balance: 1000.25,
            id: 'abc123'
        },{
            name: 'Lester Freamon',
            balance: 200.00,
            id: 'xyz789'
        }
    ];
}