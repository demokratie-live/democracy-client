import React from "react";
import styled from "styled-components/native";

const Wrapper = styled.View`
  background-color: red;
`;

const Title = styled.Text``;

const Header = () => (
  <Wrapper>
    <Title>Der Titel</Title>
  </Wrapper>
);

export default Header;
