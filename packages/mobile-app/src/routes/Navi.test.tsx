import React from 'react';
import { render } from 'react-native-testing-library';
import Navigation from './index';
import { Text } from 'react-native';

function renderNavigation() {
  return render(<Text>a button text</Text>);
}

describe('<Button />', () => {
  test('should display a simple button', async () => {
    const { getByText } = renderNavigation();

    const button = await getByText('a button text');

    expect(button).toMatchSnapshot();
  });
});
