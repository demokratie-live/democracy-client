import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components/native";

const Wrapper = styled.View`
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

const ActivityIndex = ({ count, active }) => (
  <Wrapper>
    <Icon source={active ? iconActive : iconInactive} />
    <Counter>{count}</Counter>
  </Wrapper>
);

ActivityIndex.propTypes = {
  count: PropTypes.number.isRequired,
  active: PropTypes.bool
};

ActivityIndex.defaultProps = {
  active: false
};

export default ActivityIndex;
