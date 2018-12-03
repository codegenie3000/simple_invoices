import axios from 'axios';
import { FETCH_USER } from './types';
import { FETCH_RECIPIENTS } from './types';

export function postNewUserLogin(values) {
    console.log(values);
    axios.post('/auth/local/signup', values)
        .then((result) => {
            console.log(result);
        })
        .catch(err => {
            console.log(err);
        });

    // return {type: FETCH_USER, payload: request}
}

export function fetchRecipients() {
    axios.get('/api/recipients')
        .then(result => {
            return {
                type: FETCH_RECIPIENTS,
                payload: result
            }
        })
        .catch(err => {
            console.log(err);
        });
}

/*export const postNewUserLogin = (values) => {
    console.log(values);
};*/

/*
export const postNewUserLogin = (values) => async dispatch => {
    console.log(values);
    const res = await axios.post('/auth/local/signup', values);
    console.log(res);

    dispatch({type: FETCH_USER, payload: res.data});
};*/
