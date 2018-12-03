import {combineReducers} from 'redux';
import {reducer as reduxForm} from 'redux-form';
import authReducer from './authReducer';
import recipientReducer from './recipientsReducer';

export default combineReducers({
    auth: authReducer,
    form: reduxForm,
    recipients: recipientReducer
});