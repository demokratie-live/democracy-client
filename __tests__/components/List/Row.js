import 'react-native';
import React from 'react';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import Row from '../../../src/components/List/Row';

describe('test components/List/Row', () => {
  it('render row', () => {
    this.onpress = () => {};
    const votes = 123;
    const tree = renderer
      .create(<Row title="test" subtitle="test2" date="test3" votes={votes} onPress={this.onpress} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
