import React from 'react';
import { shallow } from 'enzyme';
import { Header } from '../Header/Header';

describe('Header', () => {
  it('should match SnapShot', () => {
    const wrapper = shallow(<Header />);

    expect(wrapper).toMatchSnapshot();
  });
}); 


