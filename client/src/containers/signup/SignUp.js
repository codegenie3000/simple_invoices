import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/index';

import SignUpForm from '../../components/signUp/SignUpForm';

// SignUp Container is used to connect the component to the redux store
const SignUpContainer = props => {
    // postNewUserLogin is passed from redux actions
    const { postNewUserLogin } = props;

    return (
        <SignUpForm connectForm={ postNewUserLogin }/>
    );
};

export default connect(null, actions)(SignUpContainer);