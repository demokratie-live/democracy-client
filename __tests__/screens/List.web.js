import 'react-native';
import React from 'react';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import List from '../../src/screens/List.web';

describe('test components/List/Row', () => {
  it('render row', () => {
    const props = {
      history: () => {},
    };
    const tree = renderer.create(<List {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
