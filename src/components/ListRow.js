import React from "react";
import styled from "styled-components/native";
import PropTypes from "prop-types";

const RowWrapper = styled.View`
  padding-vertical: 14;
  padding-left: 8;
  padding-right: 14;
  border-bottom-color: #c8c7cc;
  border-bottom-width: 1;
`;

const Row = ({ children }) => <RowWrapper>{children}</RowWrapper>;

Row.propTypes = {
  children: PropTypes.node.isRequired
};

export default Row;
