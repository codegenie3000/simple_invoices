import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Field, reduxForm } from 'redux-form';
// import {withRouter} from 'react-router-dom';
import * as actions from '../../actions/index.js';
import {postNewUserLogin} from '../../actions/index';

import ButtonPrimary from '../global/Button.js';

import globalStyles from '../../stylesheets/GlobalElements.module.css';
import styles from './SignUp.module.css';
import mapDispatchToProps from 'react-redux/es/connect/mapDispatchToProps';

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
    }/*,
    {
        name: 'ConfirmPassword',
        label: 'Re-enter password',
        type: 'password',
        required: true
    }*/
];

const renderFields = () => {
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
};

let SignUp = props => {
    const {handleSubmit} = props;
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