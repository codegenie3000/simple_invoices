import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Field, reduxForm } from 'redux-form';
// import {withRouter} from 'react-router-dom';
import * as actions from '../../actions/index.js';

import ButtonPrimary from '../global/Button.js';

import globalStyles from '../../stylesheets/GlobalElements.module.css';
import styles from './SignUp.module.css';
import mapDispatchToProps from 'react-redux/es/connect/mapDispatchToProps';

const requiredValue = value => value ? undefined: '*Required';
const email = value => value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ?
    'Invalid email address' : undefined;
const minLength = value => value && value.length > 5 ? undefined : 'Must be 5 characters or more';

// Presentational Component - accepts props
const SurveyField = ({ input, name, type, label, required, meta: { touched, error, warning } }) => {
    return (
        <div className={ styles.formWidth }>
            <label className={ globalStyles.styledLabel }>{label}</label>
            <input {...input} name={name} required={required} type={type} className={ globalStyles.styledForm }/>
            <div>
                {touched && ((error && <span className={globalStyles.formWarning}>{error}</span>) || (warning && <span className={globalStyles.formWarning}>{warning}</span>))}
            </div>
        </div>
    );
};

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
        validate: [requiredValue, email]
    },
    {
        name: 'password',
        label: 'Password',
        type: 'password',
        required: true,
        validate: [requiredValue, minLength]
    }
];

const renderFields = () => {
    const fieldsToReturn = [];
    //TODO rewrite with map?
    formFields.forEach(function ({ name, label, type, required, validate }) {
        fieldsToReturn.push(
            <Field
                key={ name }
                component={ SurveyField }
                name={ name }
                props = {
                    {
                        label: label,
                        type: type,
                        required: required
                    }
                }
                validate = {validate}
            />
        );
    });
    return fieldsToReturn;
};

let SignUp = props => {
    const {handleSubmit, pristine, reset, submitting, postNewUserLogin} = props;
    const test = values => {
        postNewUserLogin(values);
    };
    return (
        <div className={ globalStyles.containerWhiteRounded }>
            <div className={ globalStyles.flexOneOuter }>
                <div className={ globalStyles.flexOneInner }>
                    <h1>Sign Up</h1>
                    <form onSubmit={handleSubmit(test)}>
                        { renderFields() }
                        <ButtonPrimary buttonText={ 'Sign up' }/>
                    </form>
                </div>
            </div>
        </div>
    );
};

/*class SignUp extends Component {

    render() {
        return (
            <div className={ globalStyles.containerWhiteRounded }>
                <div className={ globalStyles.flexOneOuter }>
                    <div className={ globalStyles.flexOneInner }>
                        <h1>Sign Up</h1>
                        <form>
                            { renderFields() }
                            <ButtonPrimary buttonText={ 'Sign up' }/>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}*/

SignUp = connect(null, actions)(SignUp);

/*class Foo extends Component {
    submit = values => {
        postNewUserLogin(values);
    };
    render() {
        return <SignUp onFormSubmit={this.submit} />
    }
}*/

// export default connect(null, actions)(withRouter(SignUp));

SignUp = reduxForm({
    form: 'signUpForm'
})(SignUp);

export default SignUp;