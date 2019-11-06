import 'react-native-gesture-handler';
import React from 'react';
import { render } from 'react-native-testing-library';
import Navigation from './index';

function renderNavigation() {
  return render(<Navigation />);
}

describe('<Button />', () => {
  test('should display a simple button', async () => {
    const { getByText } = renderNavigation();

    const button = await getByText('a button text');

    expect(button).toMatchSnapshot();
  });
});
