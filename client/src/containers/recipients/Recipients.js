import React from 'react';
import { connect } from 'react-redux';
import { requestRecipients } from '../../actions';

import RecipientsComponent from '../../components/recipients/RecipientsComponent';

function mapStateToProps(state) {
    return {
        recipients: state.recipients
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchRecipients: ()=> {
            dispatch(requestRecipients);
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RecipientsComponent);