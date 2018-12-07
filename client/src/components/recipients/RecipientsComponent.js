import React, {Component} from 'react';
// import {connect} from 'react-redux';
// import {fetchRecipients} from '../../actions';
import ButtonLink from '../../components/global/ButtonLink';
import globalStyles from '../../stylesheets/GlobalElements.module.css';

import NoRecipients from '../../components/recipients/NoRecipients';
import RecipientTable from '../../components/recipients/RecipientsTable';

const RecipientsComponent = ({recipients}) => {
    function renderRecipients() {
        if (recipients.length < 1) {
            return <NoRecipients/>
        } else {
            return <RecipientTable recipients={recipients}/>
        }
    }
    return (
        <div className={globalStyles.containerWhiteRounded}>
            <div className={globalStyles.flexOneOuterLeft}>
                <h1>Invoice Recipients</h1><ButtonLink label='Add new recipient' to='/signUp'/>
            </div>
            <div>{renderRecipients()}</div>
        </div>
    );
};


export default RecipientsComponent;