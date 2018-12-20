import axios from 'axios';
import { POST_USER, FETCH_USER, REQUEST_RECIPIENTS, RECEIVE_RECIPIENTS } from './types';

/*export const postNewUser = (values) => async dispatch => {
    //TODO check if API returns the current user data once a user is signed up
    const post = await axios.post('/auth/local/signup');
    dispatch({
        type: POST_USER,
        payload: post.data
    });
};*/

// create a request to add new user
// set isLoading true using a start request
// await the server response
// receive the user's data

export const createNewUser = async dispatch => {
    // post to server and await a response
};


export const postNewUser =

export const requestRecipients = () => {
    return {
        type: REQUEST_RECIPIENTS
    }
};

export const receiveRecipients = recipients => {
    return {
        type: RECEIVE_RECIPIENTS,
        payload: recipients
    }
};

export const fetchRecipients = async dispatch => {
    dispatch(requestRecipients());

    const res = await axios.get('/api/recipients');
    dispatch(receiveRecipients(res.data));
};

/*
export const receivePosts = async dispatch => {
    const res = axios.get('/api/recipients');

};

export const requestRecipients = async dispatch => {
    // const res = await axios.get('/api/recipients');
    /!*dispatch({
        type: REQUEST_RECIPIENTS,
        payload: res.data
    });*!/
};*/