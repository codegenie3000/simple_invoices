import React from 'react';
import { render, mount, shallow } from 'enzyme';
import { BrowserRouter, withRouter, Route } from 'react-router-dom';

import ButtonLink from './ButtonLink';

describe('Button Link', () => {
    it('should render correctly', () => {
        const component = render(withRouter(
            <ButtonLink
                to={ '/foo' }
                label={ 'foo' }
                history={ 'foo' }

            />));
        expect(component).toMatchSnapshot();
    });
    it('should receive a click', () => {
        const component = mount(
            <BrowserRouter>
                <Route>
                    <ButtonLink
                        to={ '/foo' }
                        label={ 'foo' }
                        history={ 'foo' }
                        onClick={ () => {
                        } }
                    />
                </Route>
            </BrowserRouter>
        );
        component
            .find('ButtonLink')
            .simulate('click');
        expect(component).toMatchSnapshot();
        component.unmount();
    });
});