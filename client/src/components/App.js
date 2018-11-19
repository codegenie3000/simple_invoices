import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Splash from './Splash';
import Navbar from './Navbar';
import SignUp from './signUp/SignUp';

class App extends Component{
    render() {
        return (
            <div>
                <BrowserRouter>
                    <div>
                        <Navbar/>
                        <Route exact path="/" component={ Splash }/>
                        <Route exact path="/signup" component={ SignUp }/>
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}

/*export default () => {
    return (
        <div>
            <BrowserRouter>
                <div>
                    <Navbar/>
                    <Route exact path="/" component={ Splash }/>
                    <Route exact path="/login" component={ Signup }/>
                </div>
            </BrowserRouter>
        </div>
    );
};*/

export default connect(null, actions)(App);