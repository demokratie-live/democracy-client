import React from "react";
import styled from "styled-components/native";
import Ionicons from "react-native-vector-icons/Ionicons";

const Wrapper = styled.View`
  width: 24;
  height: 24;
  border-radius: 12;
  background-color: #4494d3;
`;

const Checkmark = styled(Ionicons).attrs({
  color: ({ value }) => (value ? "#fff" : "#4494d3"),
  size: 40,
  backgroundColor: "transparent",
  name: "ios-checkmark"
})`
  margin-top: -8;
  margin-left: 4;
`;

export default ({ value, onPress }) => (
  <Wrapper onPress={onPress}>
    <Checkmark value={value} />
  </Wrapper>
);
