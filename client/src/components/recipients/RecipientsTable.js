import React from 'react';
import styles from './RecipientsTable.module.css';
import { Link } from 'react-router-dom';

import RecipientTableRow from './RecipientsTableRow';

/*function convertToDecimalString(number) {
    let decimalString = parseFloat(Math.round(number * 100) /100).toFixed(2).toString();
    return decimalString.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}*/

/*const RecipientTableRow = props => {
    const { id, name, balance } = props;
    const url = `api/recipients/${ id }`;
    return (
        <tr className={ styles.tr }>
            <td className={ styles.td }><Link to={ url }>{ name }</Link></td>
            <td className={ styles.td }>{ convertToDecimalString(balance) }</td>
        </tr>
    );
};*/

// Receives an array of objects with recipient data and returns a table
export default ({recipients}) => {
    function renderRecipients(recipients) {
        return recipients.map(recipient => {
            return <RecipientTableRow
                key={ recipient.id }
                id={ recipient.id }
                name={ recipient.name }
                balance={ recipient.balance }
            />
        });
    }

    return (
        <table className={ styles.table }>
            <thead>
            <tr>
                <th className={ styles.th }>Name</th>
                <th className={ styles.th }>Balance</th>
            </tr>
            </thead>
            <tbody>
            { renderRecipients(recipients) }
            </tbody>
        </table>
    );
}