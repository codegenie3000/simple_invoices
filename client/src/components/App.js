import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Splash from './Splash';
import Navbar from './Navbar';
import SignUp from '../containers/signup/SignUp'
import RecipientsList from '../containers/recipients/RecipientsList';

class App extends Component {
    render() {
        return (
            <div>
                <BrowserRouter>
                    <div>
                        <Navbar/>
                        <Route exact path="/" component={ Splash }/>
                        <Route exact path="/signUp" component={ SignUp }/>
                        <Route exact path="/recipients" component={ RecipientsList }/>
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}

export default connect(null, actions)(App);