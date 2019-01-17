import React from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';
import { ActivityIndicator, Dimensions } from 'react-native';

// import PieChart from './VoteResults/PieChart';
import PieChart from '../../../../components/Charts/PieChart';
import Segment from '../../Segment';
import ChartLegend from '../../../../components/Charts/ChartLegend';

import VOTES from '../../../../graphql/queries/votes';

export const { width, height } = Dimensions.get('window');

const RepresentativeText = styled.Text`
  color: rgb(142, 142, 147);
  text-align: center;
  font-size: 10;
  padding-bottom: 10;
  font-style: italic;
`;

const PieChartWrapper = styled.View`
  width: ${width - 36};
  height: ${width - 36};
`;

const VoteResults = props => {
  const { communityVotes, scrollTo } = props;

  const renderCommuntiyResult = () => {
    const { voteResults: comunnityResults } = communityVotes;
    if (
      communityVotes &&
      comunnityResults &&
      communityVotes.voted &&
      (comunnityResults.yes || comunnityResults.no || comunnityResults.abstination)
    ) {
      const votes = comunnityResults.yes + comunnityResults.no + comunnityResults.abstination;
      const data = [
        {
          label: 'Zustimmungen',
          percent: comunnityResults.yes / votes,
          color: '#15C063',
          value: comunnityResults.yes,
        },
        {
          label: 'Enthaltungen',
          percent: comunnityResults.abstination / votes,
          color: '#2C82E4',
          value: comunnityResults.abstination,
        },
        {
          label: 'Ablehnungen',
          percent: comunnityResults.no / votes,
          color: '#EC3E31',
          value: comunnityResults.no,
        },
      ];

      return (
        <PieChartWrapper>
          <PieChart data={data} label="Abstimmende" subLabel={votes} />
          <ChartLegend data={data} />
        </PieChartWrapper>
      );
    }
    return <ActivityIndicator />;
  };

  if (communityVotes.voted) {
    return (
      <Segment title="Communityergebnis" open scrollTo={scrollTo}>
        {renderCommuntiyResult()}
        <RepresentativeText>
          Dieses Ergebnis wurde nicht auf seine Repräsentativität überprüft.
        </RepresentativeText>
      </Segment>
    );
  }
  return null;
};

VoteResults.propTypes = {
  scrollTo: PropTypes.func.isRequired,
  communityVotes: PropTypes.oneOfType([PropTypes.shape(), PropTypes.bool]),
};

VoteResults.defaultProps = {
  communityVotes: null,
};

export default compose(
  graphql(VOTES, {
    options: ({ procedure }) => ({
      variables: { procedure },
      fetchPolicy: 'cache-and-network',
    }),
    props: ({ data }) => ({ communityVotes: data.votes || {} }),
  }),
)(VoteResults);
