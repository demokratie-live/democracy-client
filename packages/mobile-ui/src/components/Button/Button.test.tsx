import React from 'react';
import { render } from 'react-native-testing-library';

import Button, { Props } from '../Button';
import { Text } from 'react-native';

function renderButton(props: Partial<Props> = {}) {
  const defaultProps: Props = {
    onPress() {
      return;
    },
    children: <Text>a button text</Text>,
  };
  return render(<Button {...defaultProps} {...props} />);
}

describe('<Button />', () => {
  test('should display a simple button', async () => {
    const { getByTestId } = renderButton();

    const button = await getByTestId('button');

    expect(button).toMatchSnapshot();
  });
});
