import React from 'react';
import { shallow } from 'enzyme';
import { HomePage } from '../Home/Home';  

describe('Home', () => {
  it('should match snapshot', () => {
    const wrapper = shallow(<HomePage/>);
    expect(wrapper).toMatchSnapshot();
  });
});
