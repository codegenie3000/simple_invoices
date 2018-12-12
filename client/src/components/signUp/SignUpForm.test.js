import React from 'react';
import {shallow, mount} from 'enzyme';

import SignUpFormRedux, {SignUpForm} from './SignUpForm';

describe('<SignUpFormRedux/>', ()=> {
    let component;
    beforeAll(()=> {
        const handleSubmit = value => {console.log('submit handled')};
        const connectForm = value => {console.log('contact form prop')};
        component = mount(<SignUpForm handleSubmit={handleSubmit} connectForm={connectForm}/>);
    });
    it('matches snapshot', ()=> {
        expect(component).toMatchSnapshot();
    });
});