import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Splash from './Splash';
import Navbar from './Navbar';

export default () => {
    return (
        <div>
            <BrowserRouter>
                <div>
                    <Navbar/>
                    <Route exact path="/" component={ Splash }/>
                </div>
            </BrowserRouter>
        </div>
    );
};