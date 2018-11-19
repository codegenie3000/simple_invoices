/*
import React from 'react';
import {Field} from 'redux-form';

const SurveyField = ({input, name, type, label, required}) => {
    return (
        <div>
            <label>{label}</label>
            <input {...input} style={{marginBottom: '5px'}} />
            <div style={{marginBottom: '20px'}}>
                {touched && error}
            </div>
        </div>
    );
};

/!*
export default ({input, label, meta: {error, touched}}) => {
    return (
        <div>
            <label>{label}</label>
            <input {...input} style={{marginBottom: '5px'}} />
            <div style={{marginBottom: '20px'}}>
                {touched && error}
            </div>
        </div>
    );
};*!/

export default ({name, label, type, required}) => {
    return (
        <Field
            key={name}
            component={SurveyField}
            name={name}
            type={type}
            label={label}
            required={required}
        />
    );
}*/
