import React from 'react';
import globalStyles from '../../stylesheets/GlobalElements.module.css';
import ButtonPrimary from '../../components/global/Button';
import {reduxForm} from 'redux-form';

import Fields from './FormFields';

export const SignUpForm = props => {
    const { handleSubmit, connectForm } = props;

    return (
        <div className={ globalStyles.containerWhiteRounded }>
            <div className={ globalStyles.flexOneOuter }>
                <div className={ globalStyles.flexOneInner }>
                    <h1>Sign Up</h1>
                    <form onSubmit={ handleSubmit(connectForm)}>
                        <Fields/>
                        <ButtonPrimary buttonText={ 'Sign up' }/>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default reduxForm({
    form: 'SignUpForm'
})(SignUpForm);