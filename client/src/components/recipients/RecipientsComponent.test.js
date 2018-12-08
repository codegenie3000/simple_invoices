import React from 'react';
import { mount, shallow } from 'enzyme';
import { BrowserRouter, Route } from 'react-router-dom';

import RecipientsComponent from './RecipientsComponent';

function renderRecipientsComponent(recipientsData) {
    return shallow(
        <BrowserRouter>
            <Route>
                <RecipientsComponent recipients={recipientsData}/>
            </Route>
        </BrowserRouter>
    );
}

describe('<RecipientsComponent />', () => {
    it('renders with empty recipient array', () => {
        const recipientsData = [];
        const component = renderRecipientsComponent(recipientsData);
        expect(component).toMatchSnapshot();
    });
    it('renders with an array of recipients', () => {
        const recipientData = [
            {
                name: 'Jimmy McNulty',
                balance: 1000.25,
                id: 'abc123'
            },{
                name: 'Lester Freamon',
                balance: 200.00,
                id: 'xyz789'
            }
        ];
        const component = renderRecipientsComponent(recipientData);
        expect(component).toMatchSnapshot();
    });
});