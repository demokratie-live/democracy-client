import 'react-native';
import React from 'react';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import Content from '../../../src/components/ListDetails/Content';

describe('test components/List/Row', () => {
  it('render row', () => {
    const wrapper = renderer.create(<Content description="Test description" />).toJSON();
    expect(wrapper).toMatchSnapshot();
  });
});
