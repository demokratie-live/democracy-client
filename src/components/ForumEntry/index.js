import React from "react";
import styled from "styled-components/native";
import PropTypes from "prop-types";

const RowWrapper = styled.View`
  border-top-left-radius: 10;
  border-bottom-left-radius: 10;
  border-right-width: 3;
  border-color: ${({ argumentation }) =>
    argumentation === "pro"
      ? "#4ecd45"
      : argumentation === "contra" ? "#cd4545" : "#EAA844"};
  background-color: #fff;
  margin-bottom: 14;
  overflow: hidden;
  flex-direction: row;
`;

const Image = styled.Image.attrs({
  width: 82,
  height: 82
})`
  width: 82;
  height: 82;
`;

const EntryContent = styled.View`
  flex: 1;
  padding-horizontal: 11;
  padding-vertical: 11;
`;

const Entry = ({ image, children, argumentation }) => (
  <RowWrapper argumentation={argumentation}>
    {image && <Image {...image} />}
    <EntryContent>{children}</EntryContent>
  </RowWrapper>
);

Entry.propTypes = {
  children: PropTypes.node.isRequired
};

export default Entry;
