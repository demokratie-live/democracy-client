import React, { Component } from "react";
import styled from "styled-components/native";

const Wrapper = styled.View`
  padding-vertical: 8;
  padding-horizontal: 8;
  background-color: #efeff4;
`;

const Title = styled.Text`
  font-size: 13;
  letter-spacing: -0.08;
  color: #6d6d72;
`;

class ListSectionHeader extends Component {
  render() {
    const { title } = this.props;
    if (!title) {
      return null;
    }
    return (
      <Wrapper>
        <Title>{title.toUpperCase()}</Title>
      </Wrapper>
    );
  }
}

export default ListSectionHeader;
