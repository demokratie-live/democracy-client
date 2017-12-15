import 'react-native';
import React from 'react';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import ListDetails from '../../../src/screens/ListDetails';

describe('test components/List/Row', () => {
  it('render row', () => {
    const props = {
      match: {
        params: {
          id: 1,
        },
      },
    };
    const tree = renderer.create(<ListDetails {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
