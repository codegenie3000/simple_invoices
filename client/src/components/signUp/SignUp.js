import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import ButtonPrimary from '../global/Button.js';

import globalStyles from '../../stylesheets/GlobalElements.module.css';
import styles from './SignUp.module.css';

// Presentational Component - accepts props
const SurveyField = ({ input, name, type, label, required, meta: { error, touched } }) => {
    return (
        <div className={ styles.formWidth }>
            <label className={ globalStyles.styledLabel }>{ label }</label>
            <input { ...input } className={ globalStyles.styledForm }/>
            <div>
                { touched && error }
            </div>
        </div>
    );
};

const formFields = [
    {
        name: 'Name',
        label: 'Name',
        type: 'text',
        required: true
    },
    {
        name: 'Email',
        label: 'Email',
        type: 'email',
        required: true
    },
    {
        name: 'Password',
        label: 'Password',
        type: 'password',
        required: true
    },
    {
        name: 'ConfirmPassword',
        label: 'Re-enter password',
        type: 'password',
        required: true
    }
];

class SignUp extends Component {
    renderFields() {
        const fieldsToReturn = [];
        formFields.forEach(function ({ name, label, text, type, required }) {
            fieldsToReturn.push(
                <Field
                    key={ name }
                    component={ SurveyField }
                    name={ name }
                    type={ type }
                    label={ label }
                    required={ required }
                />
            );
        });
        return fieldsToReturn;
    }

    render() {
        return (
            <div className={ globalStyles.containerWhiteRounded }>
                <div className={ globalStyles.flexOneOuter }>
                    <div className={ globalStyles.flexOneInner }>
                        <h1>Sign Up</h1>
                        <form>
                            { this.renderFields() }
                            <ButtonPrimary buttonText={ 'Sign up' }/>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default reduxForm({
    form: 'signUpForm'
})(SignUp);