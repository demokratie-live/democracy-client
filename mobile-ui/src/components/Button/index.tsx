import React, {FC} from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';

interface Props {
  onPress: () => any;
  children: React.ReactNode;
}

const Button: FC<Props> = ({children}) => <View>{children}</View>;

Button.defaultProps = {
  children: null,
};

Button.propTypes = {
  onPress: PropTypes.func.isRequired,
  children: PropTypes.node,
};

export default Button;
