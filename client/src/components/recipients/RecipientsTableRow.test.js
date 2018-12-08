import React from 'react';
import { render, mount, shallow } from 'enzyme';

import RecipientTableRow from './RecipientsTableRow';

describe('<RecipientTableRow />', () => {
    it('renders given data', () => {
        const recipientData = {
            name: 'Jimmy McNulty',
            balance: 1000.25,
            id: 'abc123'
        };
        const component = shallow(
            <RecipientTableRow
                id={recipientData.id}
                name={recipientData.name}
                balance={recipientData.balance}
            />
        );
        expect(component).toMatchSnapshot();
    });
});