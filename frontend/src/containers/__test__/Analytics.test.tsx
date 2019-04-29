import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ConnectedAnalytics, { Analytics } from '../Analytics';
// import { pointerData } from '../../reducers/__mock__/pointerData';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

Enzyme.configure({ adapter: new Adapter() });

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
let initialState = {
  pointerReducer: {
    loading: true,
    error: false,
    allPoints: [],
  },
};
let store = mockStore(initialState);
Enzyme.configure({ adapter: new Adapter() });

let wrapper;
describe('Analytics ', () => {

  it('display loading text while fetchng the data', () => {
    
    wrapper = mount(
      <Provider store={store}>
        <ConnectedAnalytics />
      </Provider>
    );
    expect(wrapper.find('.loading').length).toBe(1);
  });

  it('fetch data should call once component render', () => {
    const mockFetch = jest.fn();
    const mockAdd = jest.fn();
    wrapper = shallow(
      <Analytics getPointers={mockFetch} addPointer={mockAdd} {...initialState.pointerReducer} />
    );
    expect(mockFetch.mock.calls.length).toBe(1)
  });

  /** working on fix for below code */
  it('should render chart and addpointer component when data is available', () => {
    // initialState = {
    //   pointerReducer: {
    //     loading: false,
    //     error: false,
    //     allPoints: pointerData,
    //   },
    // };
    // store = mockStore(initialState);
    // wrapper = mount(
    //   <Provider store={store}>
    //     <ConnectedAnalytics />
    //   </Provider>
    // );    
    // expect(wrapper.find('Chart').length).toBe(1) 
    // expect(wrapper.find('AddPointer').length).toBe(1);
  });
})