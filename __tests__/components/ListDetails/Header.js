import 'react-native';
import React from 'react';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import Header from '../../../src/components/ListDetails/Header';

describe('test components/List/Row', () => {
  it('render row', () => {
    const wrapper = renderer
      .create(<Header title="the title" votes={31523} commentsCount={84} places={3} />)
      .toJSON();
    expect(wrapper).toMatchSnapshot();
  });
});
