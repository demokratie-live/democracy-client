import React from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { graphql, compose } from 'react-apollo';
import Swiper from 'react-native-swiper';
import { ActivityIndicator, Platform } from 'react-native';

import PieChart from './VoteResults/PieChart';
import PartyChart from './VoteResults/PartyChart';
import BarChart from './VoteResults/BarChart';
import Segment from '../Segment';

import VOTES from '../../../graphql/queries/votes';

const ScrollView = styled.ScrollView.attrs({
  horizontal: true,
  pagingEnabled: true,
  showsHorizontalScrollIndicator: true,
})``;

const DecisionTextView = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding-horizontal: 25;
  padding-bottom: 20;
`;

const DecisionTextHeadline = styled.Text`
  font-size: 17;
`;

const DecisionText = styled.Text`
  color: rgb(142, 142, 147);
  padding-top: 18;
`;

const RepresentativeText = styled.Text`
  color: rgb(142, 142, 147);
  text-align: center;
  font-size: 10;
  padding-bottom: 10;
  font-style: italic;
`;

const VoteResults = props => {
  const { voteResults, communityVotes, scrollTo, type, currentStatus } = props;

  const renderCommuntiyResult = () => {
    const { voteResults: comunnityResults } = communityVotes;
    if (
      communityVotes &&
      comunnityResults &&
      communityVotes.voted &&
      (comunnityResults.yes || comunnityResults.no || comunnityResults.abstination)
    ) {
      const votes = comunnityResults.yes + comunnityResults.no + comunnityResults.abstination;
      return (
        <PieChart
          data={_.map(
            communityVotes.voteResults,
            (value, label) =>
              label !== '__typename'
                ? { value, label, percentage: Math.round(value / votes * 100) }
                : false,
          ).filter(e => e)}
          colorScale={['#15C063', '#2C82E4', '#EC3E31']}
          label="Abstimmende"
        />
      );
    }
    return <ActivityIndicator />;
  };

  const renderGovernmentVoteDetails = () => {
    const votes = voteResults.yes + voteResults.no + voteResults.notVoted + voteResults.abstination;
    if (voteResults.partyVotes.length > 0) {
      const screens = [
        <PieChart
          key="pieChart"
          data={_.map(
            voteResults,
            (value, label) =>
              label !== '__typename' && typeof value === 'number'
                ? {
                    value,
                    label,
                    fractions: voteResults.namedVote
                      ? null
                      : voteResults.partyVotes.filter(({ main }) => label === main.toLowerCase())
                          .length,
                    percentage: Math.round(value / votes * 100),
                  }
                : false,
          ).filter(e => e)}
          colorScale={['#99C93E', '#4CB0D8', '#D43194', '#B1B3B4']}
          label={voteResults.namedVote ? 'Abgeordnete' : 'Fraktionen'}
          voteResults={voteResults}
        />,
        <PartyChart
          key="partyChart"
          data={_.map(voteResults.partyVotes, partyVotes => ({
            value: partyVotes.deviants,
            label: partyVotes.party,
          }))}
          colorScale={['#99C93E', '#4CB0D8', '#D43194', '#B1B3B4']}
          label="Abgeordnete"
          voteResults={voteResults}
        />,
        <BarChart
          key="barChart"
          data={_.map(voteResults.partyVotes, partyVotes => ({
            value: partyVotes.deviants,
            label: partyVotes.party,
          }))}
          colorScale={['#99C93E', '#4CB0D8', '#D43194', '#B1B3B4']}
          label="Abgeordnete"
          voteResults={voteResults}
        />,
      ];
      if (voteResults.decisionText) {
        screens.push(
          <DecisionTextView key="decisionText">
            <DecisionTextHeadline>Beschlusstext</DecisionTextHeadline>
            <DecisionText>{voteResults.decisionText}</DecisionText>
          </DecisionTextView>,
        );
      }
      return (
        <Swiper
          loop={false}
          style={{ height: Platform.OS === 'ios' ? 'auto' : 440, maxHeight: 440 }}
          paginationStyle={{ bottom: 0 }}
        >
          {screens}
        </Swiper>
      );
    }
    return (
      <PieChart
        data={_.map(
          voteResults,
          (value, label) =>
            label !== '__typename' && typeof value === 'number'
              ? {
                  value,
                  label,
                  percentage: Math.round(value / votes * 100),
                }
              : false,
        ).filter(e => e)}
        colorScale={['#99C93E', '#4CB0D8', '#D43194', '#B1B3B4']}
        label="Abgeordnete"
      />
    );
  };

  const renderGovernmentResult = () => {
    if (
      voteResults &&
      (voteResults.yes || voteResults.no || voteResults.notVoted || voteResults.abstination)
    ) {
      return (
        <Segment title="Bundestagsergebnis" open scrollTo={scrollTo} fullWidth>
          {renderGovernmentVoteDetails()}
          <RepresentativeText style={{ marginTop: -35 }}>
            {voteResults.namedVote ? 'Namentliche Abstimmung' : 'Nicht-Namentlich Abstimmung'}
          </RepresentativeText>
        </Segment>
      );
    }
    if (currentStatus === 'Zurückgezogen') {
      return (
        <Segment title="Bundestagsergebnis" open scrollTo={scrollTo} fullWidth>
          <ScrollView>
            <PieChart
              data={[{ value: 1, label: ' ', percentage: false }]}
              colorScale={['#B1B3B4', '', '', '#B1B3B4']}
              label="Zurückgezogen"
              showNumbers={false}
            />
          </ScrollView>
        </Segment>
      );
    }
    return null;
  };

  if (communityVotes.voted && type === 'community') {
    return (
      <Segment title="Communityergebnis" open scrollTo={scrollTo} fullWidth>
        <Swiper
          loadMinimal
          style={{
            height: Platform.OS === 'ios' ? 'auto' : 420,
            maxHeight: 420,
          }}
        >
          {renderCommuntiyResult()}
        </Swiper>
        <RepresentativeText>
          Dieses Ergebnis wurde nicht auf seine Repräsentativität überprüft.
        </RepresentativeText>
      </Segment>
    );
  }
  if (type === 'government') {
    return renderGovernmentResult();
  }
  return null;
};

VoteResults.propTypes = {
  voteResults: PropTypes.shape({
    yes: PropTypes.number,
    no: PropTypes.number,
    abstination: PropTypes.number,
    notVoted: PropTypes.number,
  }),
  scrollTo: PropTypes.func.isRequired,
  communityVotes: PropTypes.oneOfType([PropTypes.shape(), PropTypes.bool]),
  type: PropTypes.string.isRequired,
  currentStatus: PropTypes.string,
};

VoteResults.defaultProps = {
  voteResults: null,
  communityVotes: null,
  currentStatus: null,
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
