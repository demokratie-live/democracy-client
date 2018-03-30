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
  const { voteResults, comunityVotes } = props;

  const renderCommuntiyResult = () => {
    const { voteResults: comunnityResults } = comunityVotes;
    if (
      comunityVotes.voted &&
      (comunnityResults.yes ||
        comunnityResults.no ||
        comunnityResults.abstination)
    ) {
      return (
        <PieChart
          data={_.map(
            comunityVotes.voteResults,
            (value, label) =>
              label !== "__typename" ? { value, label } : false
          ).filter(e => e)}
          colorScale={["#15C063", "#EC3E31", "#2C82E4"]}
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
          colorScale={["#99C93E", "#D43194", "#4CB0D8", "#B1B3B4"]}
          label="Abgeordnete"
        />
      );
    }
    return null;
  };
  if (comunityVotes.voted) {
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
  comunityVotes: PropTypes.oneOfType([
    PropTypes.shape({
      voteResults: PropTypes.shape({
        yes: PropTypes.oneOfType([PropTypes.number, null]),
        no: PropTypes.oneOfType([PropTypes.number, null]),
        abstination: PropTypes.oneOfType([PropTypes.number, null])
      })
    }),
    PropTypes.bool
  ]).isRequired
};

VoteResults.defaultProps = {
  voteResults: null
};

export default compose(
  graphql(VOTES, {
    options: ({ procedure }) => ({
      variables: { procedure },
      fetchPolicy: "cache-and-network"
    }),
    props: ({ data }) => ({ comunityVotes: data.votes || {} })
  })
)(VoteResults);
