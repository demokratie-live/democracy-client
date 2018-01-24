import React, { Component } from "react";
import styled from "styled-components/native";

const RowWrapper = styled.View`
  padding-vertical: 14;
  padding-horizontal: 14;
  border-bottom-color: #c8c7cc;
  border-bottom-width: 1;
`;

class Row extends Component {
  render() {
    return <RowWrapper>{this.props.children}</RowWrapper>;
  }
}

export default Row;
