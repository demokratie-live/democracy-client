import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components/native";

const Wrapper = styled.TouchableOpacity`
  align-items: center;
`;

const Icon = styled.Image``;

const Counter = styled.Text`
  padding-top: 8;
  font-size: 18;
  color: #8f8e94;
`;

const iconActive = require("../../assets/icons/disclosureIndicator-active.png");
const iconInactive = require("../../assets/icons/disclosureIndicator.png");

const ActivityIndex = ({ count, active, onPress }) => (
  <Wrapper onPress={onPress}>
    <Icon source={active ? iconActive : iconInactive} />
    <Counter>{count}</Counter>
  </Wrapper>
);

ActivityIndex.propTypes = {
  count: PropTypes.number,
  active: PropTypes.bool
};

ActivityIndex.defaultProps = {
  active: false,
  count: 0
};

export default ActivityIndex;
