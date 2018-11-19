import React from 'react';
import globalStyles from '../../stylesheets/GlobalElements.module.css';

const buttonMargin = {
    margin: '10px auto auto 0'
};

function ButtonPrimary ({buttonText}) {
    return (
        <button className={globalStyles.buttonPrimary} style={buttonMargin} type="submit">
            { buttonText }
        </button>
    );
}

export default ButtonPrimary;

/*
export default ({buttonText}) => {
    return (
        <button className={globalStyles.buttonPrimary} style={buttonMargin} type="submit">
            { buttonText }
        </button>
    );
}*/