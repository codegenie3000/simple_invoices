import React from 'react';
import { connect } from 'react-redux';
// import { requestRecipients } from '../../actions';
import { fetchRecipients } from '../../actions';

import RecipientsComponent from '../../components/recipients/RecipientsComponent';

function mapStateToProps(state) {
    return {
        recipients: state.recipients,
        isLoading: state.isLoading
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchRecipients: ()=> {
            dispatch(fetchRecipients);
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RecipientsComponent);