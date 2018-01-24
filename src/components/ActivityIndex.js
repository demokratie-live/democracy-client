import React, { Component } from "react";
import styled from "styled-components/native";

const Wrapper = styled.View`
  align-items: center;
`;

const Icon = styled.Image``;

const Counter = styled.Text`
  padding-top: 8;
  font-size: 18;
  letter-spacing: -0.29;
  color: #8f8e94;
`;

const iconActive = require("../../assets/icons/disclosureIndicator-active.png");
const iconInactive = require("../../assets/icons/disclosureIndicator.png");

class ActivityIndex extends Component {
  render() {
    const { count, active } = this.props;
    return (
      <Wrapper>
        <Icon source={active ? iconActive : iconInactive} />
        <Counter>{count}</Counter>
      </Wrapper>
    );
  }
}

export default ActivityIndex;
