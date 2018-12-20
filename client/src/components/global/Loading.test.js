import React from 'react';
import { shallow } from 'enzyme';

import Loading from './Loading';

describe('<Loading/>', () => {
    it('tests if it renders correctly', () => {
        const component = shallow(<Loading/>);
        expect(component).toMatchSnapshot();
    });
});