import React from 'react';
import { render, mount, shallow } from 'enzyme';
import { BrowserRouter, withRouter, Route } from 'react-router-dom';

import RecipientTable from './RecipientsTable';

describe('Recipient Table', () => {
    it('renders correctly', ()=> {
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
        const component = shallow(
            <BrowserRouter>
                <RecipientTable recipients={recipientData}/>
            </BrowserRouter>
        );
        expect(component).toMatchSnapshot();
    });
});