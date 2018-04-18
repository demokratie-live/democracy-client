import React from "react";
import styled from "styled-components/native";
import PropTypes from "prop-types";
import _ from "lodash";
import { graphql, compose } from "react-apollo";

import PieChart from "./VoteResults/PieChart";
import Segment from "../Segment";

import VOTES from "../../../graphql/queries/votes";

const ScrollView = styled.ScrollView.attrs({
  horizontal: true,
  pagingEnabled: true,
  showsHorizontalScrollIndicator: true
})``;

const VoteResults = props => {
  const { voteResults, communityVotes } = props;

  const renderCommuntiyResult = () => {
    const { voteResults: comunnityResults } = communityVotes;
    if (
      communityVotes.voted &&
      (comunnityResults.yes ||
        comunnityResults.no ||
        comunnityResults.abstination)
    ) {
      return (
        <PieChart
          data={_.map(
            communityVotes.voteResults,
            (value, label) =>
              label !== "__typename" ? { value, label } : false
          ).filter(e => e)}
          colorScale={["#15C063", "#2C82E4", "#EC3E31"]}
          label="Abstimmungen"
        />
      );
    }
    return null;
  };

  const renderGovermentResult = () => {
    if (
      voteResults &&
      (voteResults.yes ||
        voteResults.no ||
        voteResults.notVote ||
        voteResults.abstination)
    ) {
      return (
        <PieChart
          data={_.map(
            voteResults,
            (value, label) =>
              label !== "__typename" ? { value, label } : false
          ).filter(e => e)}
          colorScale={["#99C93E", "#4CB0D8", "#D43194", "#B1B3B4"]}
          label="Abgeordnete"
        />
      );
    }
    return null;
  };
  if (communityVotes.voted) {
    return (
      <Segment title="Ergebnis" open>
        <ScrollView>
          {renderCommuntiyResult()}
          {renderGovermentResult()}
        </ScrollView>
      </Segment>
    );
  }
  return null;
};

VoteResults.propTypes = {
  voteResults: PropTypes.shape({
    yes: PropTypes.number,
    no: PropTypes.number,
    abstination: PropTypes.number,
    notVote: PropTypes.number
  }),
  communityVotes: PropTypes.oneOfType([PropTypes.shape(), PropTypes.bool])
};

VoteResults.defaultProps = {
  voteResults: null,
  communityVotes: false
};

export default compose(
  graphql(VOTES, {
    options: ({ procedure }) => ({
      variables: { procedure },
      fetchPolicy: "cache-and-network"
    }),
    props: ({ data }) => ({ communityVotes: data.votes || {} })
  })
)(VoteResults);
