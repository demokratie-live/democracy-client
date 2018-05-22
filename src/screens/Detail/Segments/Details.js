import React from "react";
import styled from "styled-components/native";
import PropTypes from "prop-types";
import m from "moment";
import { View } from "react-native";

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
  font-size: 14;
  color: rgba(68, 148, 211, 0.9);
`;

const DefTitleRight = styled(DefTitle)`
  text-align: right;
`;

const DefDescr = styled.Text`
  font-size: 14;
  color: rgb(150, 150, 150);
`;

const Content = styled.View`
  padding-top: 11;
`;

const ContentText = styled(DefDescr)`
  font-size: 14;
`;

const renderType = type => {
  switch (type) {
    case "Gesetzgebung":
      return "Gesetz";
    default:
      return type;
  }
};

const Details = ({
  subjectGroups,
  submissionDate,
  dateVote,
  abstract,
  procedureId,
  currentStatus,
  type,
  voted
}) => (
  <Wrapper>
    <Head>
      {subjectGroups.length > 0 && (
        <HeadLeft>
          <DefTitle>Sachgebiete</DefTitle>
          <DefDescr>{subjectGroups.join("\n")}</DefDescr>
        </HeadLeft>
      )}
      <HeadRight>
        <HeadRightTitle>
          <DefTitleRight>Typ</DefTitleRight>
          <DefTitleRight>Vorgang</DefTitleRight>
          <DefTitleRight>erstellt am</DefTitleRight>

          {dateVote && <DefTitleRight>Abstimmung</DefTitleRight>}
        </HeadRightTitle>
        <HeadRightDescr>
          <DefDescr>{renderType(type)}</DefDescr>
          <DefDescr>{procedureId}</DefDescr>
          <DefDescr>
            {submissionDate && m(submissionDate).format("DD.MM.YY")}
          </DefDescr>
          {dateVote && <DefDescr>{m(dateVote).format("DD.MM.YY")}</DefDescr>}
        </HeadRightDescr>
      </HeadRight>
    </Head>

    <DefTitle style={{ paddingTop: 8 }}>Aktueller Stand</DefTitle>
    <DefDescr>
      {["Angenommen", "Abgelehnt"].indexOf(currentStatus) === -1 || voted
        ? currentStatus
        : "Abgestimmt"}
    </DefDescr>
    <Content>
      {abstract && (
        <View>
          <DefTitle>Inhalt</DefTitle>
          <ContentText>{abstract}</ContentText>
        </View>
      )}
    </Content>
  </Wrapper>
);

Details.propTypes = {
  subjectGroups: PropTypes.arrayOf(PropTypes.string).isRequired,
  submissionDate: PropTypes.string.isRequired,
  dateVote: PropTypes.string,
  abstract: PropTypes.string,
  procedureId: PropTypes.string.isRequired,
  currentStatus: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired
};

Details.defaultProps = {
  abstract: false,
  dateVote: false
};

export default Details;
