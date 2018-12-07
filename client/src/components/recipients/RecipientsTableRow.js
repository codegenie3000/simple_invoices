import React from 'react';
import styles from './RecipientsTableRow.module.css';
import { Link } from 'react-router-dom';

function convertToDecimalString(number) {
    let decimalString = parseFloat(Math.round(number * 100) / 100).toFixed(2).toString();
    return decimalString.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

const RecipientTableRow = props => {
    const { id, name, balance } = props;
    const url = `api/recipients/${ id }`;
    return (
        <tr className={ styles.tr }>
            <td className={ styles.td }><Link to={ url }>{ name }</Link></td>
            <td className={ styles.td }>{ convertToDecimalString(balance) }</td>
        </tr>
    );
};

export default RecipientTableRow;