import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import AddPointer from '../AddPointer';
Enzyme.configure({ adapter: new Adapter() });

let wrapper;
describe('unit test cases for AddPointer component', () => {
  it('on change of text field state should be chnage', () => {
    let newValue = 30;
    let addPointerProps = {
      addPointer: jest.fn(),
    }
    wrapper = shallow(<AddPointer {...addPointerProps} />);
    wrapper.find('.pointerValue').simulate('change', {
      currentTarget: {
        value: newValue,
      },
    });
    expect(wrapper.state().value).toBe(newValue);
  });

  it('on submit prop action should be called', () => {
    let addPointerProps = {
      addPointer: jest.fn(),
    }
    wrapper = shallow(<AddPointer {...addPointerProps} />);
    wrapper.find('.btn').simulate('click', {});
    expect(addPointerProps.addPointer.mock.calls.length).toBe(1);
  });
})