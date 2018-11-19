import axios from 'axios';
import { FETCH_USER } from './types';

export const postNewUserLogin = () => async dispatch => {
    const res = await axios.post('/auth/local/signup');

    dispatch({type: FETCH_USER, payload: res.data});
};