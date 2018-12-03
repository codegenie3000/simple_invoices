import React from 'react';
import globalStyles from '../../stylesheets/GlobalElements.module.css';
import {withRouter} from 'react-router-dom';

const buttonMargin = {
    margin: '10px auto auto 0'
};

function ButtonPrimary (props) {
    const {to, label, history, onClick, location, match, staticContext, ...rest} = props;
    return (
        <button
            {...rest}
            className={globalStyles.buttonPrimary}
            onClick={event => {
                onClick && onClick(event);
                history.push(to)
            }}
            >{label}
        </button>
    );
}

export default withRouter(ButtonPrimary);
