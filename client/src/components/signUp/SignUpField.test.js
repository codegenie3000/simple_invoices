import React from 'react';
import { shallow } from 'enzyme';

import SignUpField from './SignUpField';

describe('<SignUpField />', () => {
    let component;
    let testName = 'testName';
    let testLabel = 'testLabel';
    let testRequired = true;

    beforeEach(() => {
        component = shallow(<SignUpField
            name={testName}
            label={testLabel}
            required={testRequired}
            meta={
                {
                    touched: '',
                    error: '',
                    warning: ''
                }
            }
        />);
    });
    it('matches snapshot', () => {
        expect(component).toMatchSnapshot();
    });
    it('tests if props are working properly', () => {
        expect(component.at(0).children().at(1).props().name).toEqual(testName);
        expect(component.at(0).children().at(0).children().at(0).text()).toEqual(testLabel);
        expect(component.at(0).children().at(1).props().required).toEqual(testRequired);
    });
});