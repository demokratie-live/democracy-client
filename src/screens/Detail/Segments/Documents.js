import React from "react";
import styled from "styled-components/native";
import PropTypes from "prop-types";
import { Navigator } from "react-native-navigation";

import Document from "../../../components/Document";

const Wrapper = styled.View``;

const Documents = ({ documents, navigator }) => (
  <Wrapper>
    {documents.map(doc => (
      <Document key={doc.number} {...doc} navigator={navigator} />
    ))}
  </Wrapper>
);

Documents.propTypes = {
  documents: PropTypes.arrayOf(PropTypes.object.isRequired),
  navigator: PropTypes.instanceOf(Navigator).isRequired
};

Documents.defaultProps = {
  documents: []
};

export default Documents;
