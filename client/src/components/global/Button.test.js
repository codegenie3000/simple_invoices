import React from 'react';
import { shallow, render } from 'enzyme';

import ButtonPrimary from './Button';

describe('Button Primary', () => {
    it('should render correctly', () => {
        const component = render(<ButtonPrimary buttonText={'foo'}/>);
        expect(component).toMatchSnapshot();
    })
});
