import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import {postNewUserLogin} from '../../actions/index';
import globalStyles from '../../stylesheets/GlobalElements.module.css';
import ButtonPrimary from '../../components/global/Button';
import SignUpField from '../../components/signUp/SignUpField';

// Validations
const requiredValue = value => value ? undefined : '*Required';
const email = value => value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ?
    'Invalid email address' : undefined;
const minLength = value => value && value.length > 5 ? undefined : 'Must be 5 characters or more';


const formFields = [
    {
        name: 'displayName',
        label: 'Name',
        type: 'text',
        required: true,
        validate: requiredValue
    },
    {
        name: 'email',
        label: 'Email',
        type: 'email',
        required: true,
        validate: [ requiredValue, email ]
    },
    {
        name: 'password',
        label: 'Password',
        type: 'password',
        required: true,
        validate: [ requiredValue, minLength ]
    }
];

const renderFormFields = () => {
    return formFields.map(function ({ name, label, type, required, validate }) {
        return (
            <Field
                key={ name }
                component={ SignUpField }
                name={ name }
                props={
                    {
                        label: label,
                        type: type,
                        required: required
                    }
                }
                validate={validate}
            />);
    });
};

let SignUp = props => {
    //handleSubmit is passed from reduxForm
    const { handleSubmit, postNewUserLogin } = props;
    const postValues = values => {
        postNewUserLogin(values);
    };
    return (
        <div className={ globalStyles.containerWhiteRounded }>
            <div className={ globalStyles.flexOneOuter }>
                <div className={ globalStyles.flexOneInner }>
                    <h1>Sign Up</h1>
                    <form onSubmit={ handleSubmit(postValues) }>
                        { renderFormFields() }
                        <ButtonPrimary buttonText={ 'Sign up' }/>
                    </form>
                </div>
            </div>
        </div>
    );
};

SignUp = connect(null, postNewUserLogin)(SignUp);

SignUp = reduxForm({
    form: 'SignUpForm'
})(SignUp);

export default SignUp;