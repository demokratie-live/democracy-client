import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { Dimensions } from 'react-native';

const Wrapper = styled.TouchableOpacity`
  width: ${Dimensions.get('window').width};
  padding-horizontal: 18;
  padding-vertical: 18;
  background-color: ${({ color }) => color};
  align-items: center;
`;

const Title = styled.Text`
  font-weight: bold;
`;

const Description = styled.Text``;

class SmsError extends PureComponent {
  state = {
    clicked: false,
  };
  render() {
    const { title, description, color, onClick } = this.props;
    const { clicked } = this.state;
    if (clicked) {
      return null;
    }
    return (
      <Wrapper
        color={color}
        onPress={() => {
          this.setState({ clicked: true });
          onClick();
        }}
      >
        <Title>{title}</Title>
        {description && <Description>{description}</Description>}
      </Wrapper>
    );
  }
}

SmsError.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  color: PropTypes.string,
  onClick: PropTypes.func,
};

SmsError.defaultProps = {
  description: false,
  color: 'orange',
  onClick: () => {},
};

export default SmsError;
