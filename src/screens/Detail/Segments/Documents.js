import React from "react";
import styled from "styled-components/native";
import PropTypes from "prop-types";

import Document from "../../../components/Document";

const Wrapper = styled.View``;

const Documents = ({ documents }) => (
  <Wrapper>
    {documents.map(doc => <Document key={doc.number} {...doc} />)}
  </Wrapper>
);

Documents.propTypes = {
  documents: PropTypes.arrayOf(PropTypes.object.isRequired)
};

Documents.defaultProps = {
  documents: []
};

export default Documents;
