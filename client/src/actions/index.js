import axios from 'axios';
import { FETCH_USER } from './types';
import { POST_USER } from './types';
import { FETCH_RECIPIENTS } from './types';

/*export function postNewUserLogin(values) {
    console.log(values);
    /!*return {
        type: FETCH_USER,
        payload: values
    };*!/
    const request = axios.post('/auth/local/signup', values);
    return {
        type: FETCH_USER,
        payload: request
    }
}*/

export const postNewUser = (values) => async dispatch => {
    //TODO check if API returns the current user data once a user is signed up
    const post = axios.post('/auth/local/signup');
    dispatch({
        type: POST_USER,
        payload: post.data
    });
};

/*
export function fetchRecipients() {
    const request = axios.get('/api/recipients');
    return {
        type: FETCH_RECIPIENTS,
        payload: request
    }
}*/

export const fetchRecipients = async dispatch => {
    // const res = axios.get('/api/recipients');
    const res = {data: [
            {
                name: 'Jimmy McNulty',
                balance: 1000.25,
                id: 'abc123'
            }
        ]
    };

    dispatch({
        type: FETCH_RECIPIENTS,
        payload: res.data
    });
};