import React from 'react';

import globalStyles from '../../stylesheets/GlobalElements.module.css';
import styles from './SignUpField.module.css';

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

export default SurveyField;