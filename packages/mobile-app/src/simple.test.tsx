import React from 'react';
import { render } from 'react-native-testing-library';
import { Text } from 'react-native';

function renderNavigation() {
  return render(<Text>a simple Text!</Text>);
}

describe('<Text />', () => {
  test('should display a simple text', async () => {
    	const { getByText } = renderNavigation();

    const button = await getByText('a simple Text!');

    expect(button).toMatchSnapshot();
  });
});
