import React from 'react';
import {shallow} from 'enzyme';

import FormFields from './FormFields';

describe('<FormFields />', ()=> {
    let component;

    beforeEach(()=> {
        component = shallow(<FormFields/>);
    });
    it('matches the snapshot', ()=> {
        expect(component).toMatchSnapshot();
    });
});