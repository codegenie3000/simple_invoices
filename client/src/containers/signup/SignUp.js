import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import * as actions from '../../actions/index';
import globalStyles from '../../stylesheets/GlobalElements.module.css';
import ButtonPrimary from '../../components/global/Button';

import SignUpForm from '../../components/signUp/SignUpForm';

// SignUp Container is used to connect the component to the redux store
const SignUpContainer = props => {
    const { postNewUserLogin } = props;

    return (
        <SignUpForm connectForm={ postNewUserLogin }/>
    );
};

export default connect(null, actions)(SignUpContainer);