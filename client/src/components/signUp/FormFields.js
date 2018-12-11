import React from 'react';
import { Field } from 'redux-form';

import SignUpField from './SignUpField';

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

const Fields = props => {
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
                validate={ validate }
            />
        );
    });
};
export default Fields;