import React from 'react';
import { render, mount, shallow } from 'enzyme';

import NoRecipients from './NoRecipients';

describe('No Recipients Component', () => {
    it('should render correctly', () => {
        const component = shallow(
            <NoRecipients/>
        );
        expect(component).toMatchSnapshot();
        expect(component.exists('.no-recipients')).toEqual(true);
    });
});