import React from "react";
import styled from "styled-components/native";
import PropTypes from "prop-types";
import Pdf from "react-native-pdf";

const Wrapper = styled.View`
  flex: 1;
  background-color: white;
`;

const Document = ({ url }) => (
  <Wrapper>
    <Pdf
      source={{
        uri: url.replace(".de:80", ".de")
        // uri: "http://dipbt.bundestag.de/dip21/btp/19/19011.pdf#P.776"
      }}
      style={{ flex: 1 }}
    />
  </Wrapper>
);

Document.propTypes = {
  url: PropTypes.string.isRequired
};

export default Document;
