import React from 'react';
import ReactDOM from 'react-dom';
import Old_App from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Old_App />, div);
  ReactDOM.unmountComponentAtNode(div);
});
