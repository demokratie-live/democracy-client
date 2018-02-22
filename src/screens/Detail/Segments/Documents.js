import React from "react";
import styled from "styled-components/native";
import PropTypes from "prop-types";

import Document from "../../../components/Document";

const Wrapper = styled.View``;

const Details = ({ documents }) => (
    <Wrapper>
      {documents.map(doc => <Document key={doc.number} {...doc} />)}
    </Wrapper>
  );

Details.propTypes = {
  documents: PropTypes.arrayOf(PropTypes.object.isRequired)
};

Details.defaultProps = {
  documents: []
};

export default Details;
