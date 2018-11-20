import axios from 'axios';
import { FETCH_USER } from './types';

export const postNewUserLogin = (values) => {
    console.log(values);
};

/*
export const postNewUserLogin = (values) => async dispatch => {
    console.log(values);
    const res = await axios.post('/auth/local/signup', values);
    console.log(res);

    dispatch({type: FETCH_USER, payload: res.data});
};*/
