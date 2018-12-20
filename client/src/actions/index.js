import axios from 'axios';
import { FETCH_USER } from './types';
import { POST_USER } from './types';
import { REQUEST_RECIPIENTS } from './types';

export const postNewUser = (values) => async dispatch => {
    //TODO check if API returns the current user data once a user is signed up
    const post = await axios.post('/auth/local/signup');
    dispatch({
        type: POST_USER,
        payload: post.data
    });
};

export const requestRecipients = async dispatch => {
    const res = await axios.get('/api/recipients');

    dispatch({
        type: REQUEST_RECIPIENTS,
        payload: res.data
    });
};