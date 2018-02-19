import React, { Component } from "react";
import styled from "styled-components/native";
import PropTypes from "prop-types";

import Document from "../../../components/Document";

const Wrapper = styled.View``;

const Head = styled.View`
  flex-direction: row;
`;

const HeadLeft = styled.View`
  flex: 1;
`;

const HeadRight = styled.View`
  flex: 1;
  flex-direction: row;
`;

const HeadRightTitle = styled.View`
  flex: 1;
`;

const HeadRightDescr = styled.View`
  padding-left: 8;
`;

const DefTitle = styled.Text`
  font-size: 12;
  color: rgba(68, 148, 211, 0.9);
`;

const DefTitleRight = styled(DefTitle)`
  text-align: right;
`;

const DefDescr = styled.Text`
  font-size: 12;
  color: rgb(155, 155, 155);
`;

const Content = styled.View``;

const ContentText = styled(DefDescr)`
  font-size: 11;
`;

class Details extends Component {
  renderDocuments = documents =>
    documents.map(({ title }) => <Document key={title} text={title} />);

  render() {
    const {
      recources,
      documentId,
      dateCreated,
      dateVote,
      abstract,
      documents
    } = this.props;
    return (
      <Wrapper>
        <Head>
          <HeadLeft>
            <DefTitle>Sachgebiet</DefTitle>
            <DefDescr>{recources}</DefDescr>
          </HeadLeft>
          <HeadRight>
            <HeadRightTitle>
              <DefTitleRight>Dok.-Nr.</DefTitleRight>
              <DefTitleRight>erstellt am</DefTitleRight>
              <DefTitleRight>Abstimmung</DefTitleRight>
            </HeadRightTitle>
            <HeadRightDescr>
              <DefDescr>{documentId}</DefDescr>
              <DefDescr>{dateCreated}</DefDescr>
              <DefDescr>{dateVote}</DefDescr>
            </HeadRightDescr>
          </HeadRight>
        </Head>
        <Content>
          <DefTitle>Inhalt</DefTitle>
          <ContentText>{abstract}</ContentText>
          {this.renderDocuments(documents)}
        </Content>
      </Wrapper>
    );
  }
}

Details.propTypes = {
  recources: PropTypes.string.isRequired,
  documentId: PropTypes.string.isRequired,
  dateCreated: PropTypes.string.isRequired,
  dateVote: PropTypes.string.isRequired,
  abstract: PropTypes.string,
  documents: PropTypes.arrayOf(PropTypes.object.isRequired)
};

Details.defaultProps = {
  documents: [],
  abstract: ""
};

export default Details;
