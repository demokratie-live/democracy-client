import React from 'react';
import { render } from 'react-native-testing-library';

import { Button, Props } from '../Button';

function renderButton(props: Partial<Props> = {}) {
  const defaultProps: Props = {
    onPress() {
      return;
    },
    text: 'a button text',
    textColor: 'red',
  };
  return render(<Button {...defaultProps} {...props} />);
}

describe('<Button />', () => {
  test('should display a simple button', async () => {
    const { getByTestId } = renderButton();

    const button = await getByTestId('Button');

    expect(button).toMatchSnapshot();
  });
});
