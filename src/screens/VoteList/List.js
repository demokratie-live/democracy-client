import React, { Component } from "react";
import { View, Text } from "react-native";
import styled from "styled-components/native";

import Row from "../../components/Row";

const Wrapper = styled.View`
  flex: 1;
  background-color: #fff;
`;

class List extends Component {
  render() {
    const { listType } = this.props;
    return (
      <Wrapper>
        <Row>
          <Text>Hallo Welt</Text>
        </Row>
        <Row>
          <Text>Hallo Welt</Text>
        </Row>
        <Row>
          <Text>Hallo Welt</Text>
        </Row>
      </Wrapper>
    );
  }
}

export default List;
