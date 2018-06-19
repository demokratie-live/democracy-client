import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components/native";
import { Dimensions } from "react-native";
import { Navigator } from "react-native-navigation";

const Wrapper = styled.TouchableOpacity`
  width: ${Dimensions.get("window").width};
  padding-horizontal: 18;
  padding-vertical: 18;
  background-color: ${({ color }) => color};
  align-items: center;
`;

const Title = styled.Text`
  font-weight: bold;
`;

const Description = styled.Text``;

class InAppNotification extends Component {
  state = {
    clicked: false
  };
  render() {
    const { title, description, color, onClick, navigator } = this.props;
    const { clicked } = this.state;
    if (clicked) {
      return null;
    }
    return (
      <Wrapper
        color={color}
        onPress={() => {
          this.setState({ clicked: true });
          navigator.dismissModal({
            animationType: "slide-down" // 'none' / 'slide-down' , dismiss animation for the modal (optional, default 'slide-down')
          });
          onClick();
        }}
      >
        <Title>{title}</Title>
        {description && <Description>{description}</Description>}
      </Wrapper>
    );
  }
}

InAppNotification.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  color: PropTypes.string,
  onClick: PropTypes.func,
  navigator: PropTypes.instanceOf(Navigator).isRequired
};

InAppNotification.defaultProps = {
  description: false,
  color: "orange",
  onClick: () => {}
};

export default InAppNotification;
