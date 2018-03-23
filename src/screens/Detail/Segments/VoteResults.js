import React from "react";
import styled from "styled-components/native";
import PropTypes from "prop-types";
import _ from "lodash";
import { graphql } from "react-apollo";

import PieChart from "./VoteResults/PieChart";

import VOTES from "../../../graphql/queries/votes";

const ScrollView = styled.ScrollView.attrs({
  horizontal: true,
  pagingEnabled: true,
  showsHorizontalScrollIndicator: true
})``;

const VoteResults = props => {
  const { voteResults, comunityVotes } = props;
  return (
    <ScrollView>
      {comunityVotes && (
        <PieChart
          data={_.map(
            comunityVotes.voteResults,
            (value, label) =>
              label !== "__typename" ? { value, label } : false
          ).filter(e => e)}
          colorScale={["#15C063", "#EC3E31", "blue"]}
        />
      )}
      <PieChart
        data={_.map(
          voteResults,
          (value, label) => (label !== "__typename" ? { value, label } : false)
        ).filter(e => e)}
        colorScale={["#99C93E", "#D43194", "#4CB0D8", "#B1B3B4"]}
      />
    </ScrollView>
  );
};

VoteResults.propTypes = {
  voteResults: PropTypes.shape({
    yes: PropTypes.number.isRequired,
    no: PropTypes.number.isRequired,
    abstination: PropTypes.number.isRequired,
    notVote: PropTypes.number.isRequired
  }).isRequired,
  comunityVotes: PropTypes.shape({
    voteResults: PropTypes.shape({
      yes: PropTypes.number.isRequired,
      no: PropTypes.number.isRequired,
      abstination: PropTypes.number.isRequired
    }).isRequired
  }).isRequired
};

VoteResults.defaultProps = {};

export default graphql(VOTES, {
  options: ({ procedure }) => ({
    variables: { procedure },
    fetchPolicy: "cache-and-network"
  }),
  props: ({ data }) => ({ comunityVotes: data.votes })
})(VoteResults);
