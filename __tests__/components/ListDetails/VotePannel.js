import 'react-native';
import React from 'react';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import VotePannel from '../../../src/components/ListDetails/VotePannel';

describe('test components/List/Row', () => {
  it('render row', () => {
    const wrapper = renderer.create(<VotePannel />).toJSON();
    expect(wrapper).toMatchSnapshot();
  });
});
