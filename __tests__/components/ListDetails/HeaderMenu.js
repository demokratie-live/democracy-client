import 'react-native';
import React from 'react';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import HeaderMenu from '../../../src/components/ListDetails/HeaderMenu';

describe('test components/List/Row', () => {
  it('render row', () => {
    const wrapper = renderer.create(<HeaderMenu commentsCount={35} places={75} />).toJSON();
    expect(wrapper).toMatchSnapshot();
  });
});
