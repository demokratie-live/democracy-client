import React, { Component } from "react";
import styled from "styled-components/native";
import PropTypes from "prop-types";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import { RefreshControl } from "react-native";

import ActivityIndex from "../../components/ActivityIndex";
import DateTime from "../../components/Date";
import SegmentDetails from "./Segments/Details";
import SegmentDocuments from "./Segments/Documents";
import Segment from "./Segment";
import Voting from "./Voting";

const Wrapper = styled.ScrollView`
  flex: 1;
  background-color: #fff;
`;

const Intro = styled.View`
  flex-direction: row;
  background-color: #fff;
  padding-vertical: 18;
  padding-horizontal: 18;
`;

const IntroMain = styled.View`
  flex: 1;
  padding-right: 10;
`;

const IntroTitle = styled.Text`
  font-size: 17;
`;

const IntroButtons = styled.View`
  justify-content: center;
  padding-top: 20;
`;

const IntroButton = styled.Image``;

const IntroSide = styled.View`
  justify-content: space-between;
`;

const TagsWrapper = styled.View`
  background-color: rgb(239, 239, 244);
`;

const TagsText = styled.Text`
  color: rgb(142, 142, 147);
  font-size: 13;
  padding-horizontal: 18;
  padding-vertical: 10;
`;

const Content = styled.View`
  flex: 1;
`;

class Detail extends Component {
  static navigatorStyle = {
    navBarBackgroundColor: "#4494d3",
    navBarTextColor: "#FFFFFF",
    navBarTextFontSize: 17,
    navBarLeftButtonColor: "#FFFFFF",
    navBarButtonColor: "#FFFFFF"
  };

  render() {
    const { activityIndex, listType, procedureId } = this.props;
    const { data: { loading, refetch } } = this.props;
    if (loading && !this.props.data.procedure) {
      return null;
    }
    const {
      title,
      tags,
      abstract,
      active,
      voteDate: date,
      subjectGroups,
      submissionDate,
      importantDocuments
    } = this.props.data.procedure;
    return (
      <Wrapper
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={refetch} />
        }
      >
        <Intro>
          <IntroMain>
            <IntroTitle>{title}</IntroTitle>
            <IntroButtons>
              <IntroButton
                source={require("../../../assets/icons/shape.png")}
              />
            </IntroButtons>
          </IntroMain>
          <IntroSide>
            <ActivityIndex count={activityIndex} active={active} />
            {date && <DateTime date={date} />}
          </IntroSide>
        </Intro>
        <Content>
          {tags.length > 0 && (
            <TagsWrapper>
              <TagsText>{tags.join(", ")}</TagsText>
            </TagsWrapper>
          )}
          <Segment title="Details" open>
            <SegmentDetails
              subjectGroups={subjectGroups}
              submissionDate={submissionDate}
              dateVote={date}
              abstract={abstract}
              procedureId={procedureId}
            />
          </Segment>
          <Segment title="Dokumente">
            <SegmentDocuments documents={importantDocuments} />
          </Segment>
          {listType === "VOTING" && <Voting />}
        </Content>
      </Wrapper>
    );
  }
}

Detail.propTypes = {
  title: PropTypes.string.isRequired,
  activityIndex: PropTypes.number.isRequired,
  active: PropTypes.bool.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  abstract: PropTypes.string,
  listType: PropTypes.string.isRequired,
  procedureId: PropTypes.string.isRequired,
  data: PropTypes.shape().isRequired
};

Detail.defaultProps = {
  abstract: ""
};

export default graphql(
  gql`
    query procedure($id: ID!) {
      procedure(id: $id) {
        title
        tags
        abstract
        voteDate
        subjectGroups
        submissionDate
        importantDocuments {
          editor
          type
          url
          number
        }
      }
    }
  `,
  {
    options: ({ procedureId }) => ({
      variables: { id: procedureId },
      fetchPolicy: "cache-and-network"
    })
  }
)(Detail);
