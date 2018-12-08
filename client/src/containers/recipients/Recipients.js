import React from 'react';
import { connect } from 'react-redux';
import { fetchRecipients } from '../../actions';

import RecipientsComponent from '../../components/recipients/RecipientsComponent';

function mapStateToProps(state) {
    return {
        recipients: state.recipients
    }
}

export default connect(mapStateToProps, { fetchRecipients })(RecipientsComponent);