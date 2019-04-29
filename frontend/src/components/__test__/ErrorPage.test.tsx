import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ErrorPage from '../ErrorPage';
Enzyme.configure({ adapter: new Adapter() });

let wrapper;
describe('render Error page', () => {
  it('should render with message', () => {
    wrapper = shallow(<ErrorPage />);
    expect(wrapper.find('.errorPage').length).toBe(1);
  });
});
