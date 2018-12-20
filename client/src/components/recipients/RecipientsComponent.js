import React, {Component} from 'react';
// import {connect} from 'react-redux';
// import {requestRecipients} from '../../actions';
import ButtonLink from '../../components/global/ButtonLink';
import globalStyles from '../../stylesheets/GlobalElements.module.css';

import NoRecipients from '../../components/recipients/NoRecipients';
import RecipientTable from '../../components/recipients/RecipientsTable';

class RecipientsComponent extends Component {
    // fetches recipients using mapDispatchToProps from Recipients container when RecipientsComponent is mounted
    componentDidMount() {
        this.props.fetchRecipients();
    }

    // this.props.recipients is passed to RecipientsComponent from mapStateToProps from RecipientsContainer
    renderRecipients() {
        if (this.props.recipients.length < 1) {
            return <NoRecipients/>
        } else {
            return <RecipientTable recipients={this.props.recipients}/>
        }
    }

    render() {
        return (
            <div className={globalStyles.containerWhiteRounded}>
                <div className={globalStyles.flexOneOuterLeft}>
                    <h1>Invoice Recipients</h1><ButtonLink label='Add new recipient' to='/signUp'/>
                </div>
                <div>{this.renderRecipients()}</div>
            </div>
        );
    }
}

export default RecipientsComponent;