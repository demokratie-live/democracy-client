import React from "react";
import styled from "styled-components/native";
import PropTypes from "prop-types";

const Wrapper = styled.View`
  padding-vertical: 8;
  padding-horizontal: 8;
  background-color: #efeff4;
`;

const Title = styled.Text`
  font-size: 13;
  color: #6d6d72;
`;

const ListSectionHeader = ({ title }) => {
  if (!title) {
    return null;
  }
  return (
    <Wrapper>
      <Title>{title.toUpperCase()}</Title>
    </Wrapper>
  );
};

ListSectionHeader.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.bool])
};

ListSectionHeader.defaultProps = {
  title: false
};

export default ListSectionHeader;
