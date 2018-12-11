import axios from 'axios';
import { FETCH_USER } from './types';
import { FETCH_RECIPIENTS } from './types';

export function postNewUserLogin(values) {
    console.log(values);
    /*return {
        type: FETCH_USER,
        payload: values
    };*/
    const request = axios.post('/auth/local/signup', values);
    return {
        type: FETCH_USER,
        payload: request
    }
}

export function fetchRecipients() {
    const request = axios.get('/api/recipients');
    return {
        type: FETCH_RECIPIENTS,
        payload: request
    }
}