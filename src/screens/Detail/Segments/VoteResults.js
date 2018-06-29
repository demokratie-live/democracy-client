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
  const { voteResults, communityVotes, scrollTo, type, currentStatus } = props;

  const renderCommuntiyResult = () => {
    const { voteResults: comunnityResults } = communityVotes;
    if (
      communityVotes.voted &&
      (comunnityResults.yes ||
        comunnityResults.no ||
        comunnityResults.abstination)
    ) {
      const votes =
        comunnityResults.yes +
        comunnityResults.no +
        comunnityResults.abstination;
      return (
        <PieChart
          data={_.map(
            communityVotes.voteResults,
            (value, label) =>
              label !== "__typename"
                ? { value, label, percentage: Math.round(value / votes * 100) }
                : false
          ).filter(e => e)}
          colorScale={["#15C063", "#2C82E4", "#EC3E31"]}
          label="Abstimmende"
        />
      );
    }
    return null;
  };

  const renderGovernmentResult = () => {
    if (
      voteResults &&
      (voteResults.yes ||
        voteResults.no ||
        voteResults.notVote ||
        voteResults.abstination)
    ) {
      const votes =
        voteResults.yes +
        voteResults.no +
        voteResults.notVote +
        voteResults.abstination;
      return (
        <Segment title="Bundestagsergebnis" open scrollTo={scrollTo}>
          <ScrollView>
            <PieChart
              data={_.map(
                voteResults,
                (value, label) =>
                  label !== "__typename"
                    ? {
                        value,
                        label,
                        percentage: Math.round(value / votes * 100)
                      }
                    : false
              ).filter(e => e)}
              colorScale={["#99C93E", "#4CB0D8", "#D43194", "#B1B3B4"]}
              label="Abgeordnete"
            />
          </ScrollView>
        </Segment>
      );
    }
    if (currentStatus === "Zurückgezogen") {
      return (
        <Segment title="Bundestagsergebnis" open scrollTo={scrollTo}>
          <ScrollView>
            <PieChart
              data={[{ value: 1, label: " ", percentage: false }]}
              colorScale={["#B1B3B4", "", "", "#B1B3B4"]}
              label="Zurückgezogen"
              showNumbers={false}
            />
          </ScrollView>
        </Segment>
      );
    }
    return null;
  };
  if (communityVotes.voted) {
    if (type === "community") {
      return (
        <Segment title="Communityergebnis" open scrollTo={scrollTo}>
          <ScrollView>{renderCommuntiyResult()}</ScrollView>
        </Segment>
      );
    }
    return renderGovernmentResult();
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
  scrollTo: PropTypes.func.isRequired,
  communityVotes: PropTypes.oneOfType([PropTypes.shape(), PropTypes.bool]),
  type: PropTypes.string.isRequired,
  currentStatus: PropTypes.string
};

VoteResults.defaultProps = {
  voteResults: null,
  communityVotes: null,
  currentStatus: null
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
