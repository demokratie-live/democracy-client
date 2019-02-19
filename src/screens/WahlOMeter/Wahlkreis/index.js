import React from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import { Platform } from 'react-native';
import { Navigator } from 'react-native-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Svg, { Rect, Text as SvgText, G } from 'react-native-svg';

// Components
import ChartLegend from '../../../components/Charts/ChartLegend';
import Header from '../Header';
import ChartNote from '../ChartNote';
import VotedProceduresWrapper from './VotedProceduresWrapper';
import ListSectionHeader from '../../../components/ListSectionHeader';
import NoVotesPlaceholder from '../NoVotesPlaceholder';
import PartyComponent from '../../../components/Parties';

const Wrapper = styled.View`
  padding-top: 18;
`;

const MemberImageWrapper = styled.View`
  width: 200;
  height: 275;
  align-items: center;
  padding-bottom: 8;
`;

const MemberImage = styled.Image.attrs({
  resizeMode: 'contain',
})`
  flex: 1;
  height: 175;
  width: 200;
  border-radius: 100;
  border-width: ${() => (Platform.OS === 'ios' ? 1 : 0)};
  border-color: lightgray;
`;

const Party = styled(PartyComponent)`
  position: absolute;
  right: 0;
  bottom: 30;
`;

const InfoIconButton = styled.TouchableOpacity`
  padding-left: 9;
`;

const InfoIcon = styled(Ionicons).attrs(() => ({
  size: 24,
  name: 'ios-information-circle-outline',
  color: 'rgb(199, 199, 204)',
}))``;

const DeputyDetailsWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  position: relative;
  left: 20;
`;

const NameWrapper = styled.View`
  align-items: center;
`;

const Text = styled.Text`
  font-size: 15;
`;

const TextLighGrey = styled(Text)`
  color: #9b9b9b;
`;

const ChartWrapper = styled.View`
  align-items: center;
`;

// Filtered Array of procedures voted local
const getMatchingProcedures = ({ votedProcedures, localVotes }) =>
  votedProcedures.filter(({ procedureId }) =>
    localVotes.votesSelectionLocal.find(({ procedureId: pid }) => pid === procedureId),
  );

const pieChartData = ({ localVotes, matchingProcedures }) => {
  // Pie Chart Data Preparation
  let pieDataRaw = matchingProcedures.map(({ decision, procedureId }) => ({
    deputy: decision,
    me: localVotes.votesSelectionLocal.find(({ procedureId: pid }) => pid === procedureId)
      .selection,
  }));
  const pieData = pieDataRaw.reduce(
    (pre, { deputy, me }) => {
      if (me === deputy) {
        return { ...pre, matches: pre.matches + 1, count: pre.count + 1 };
      } else {
        return { ...pre, diffs: pre.diffs + 1, count: pre.count + 1 };
      }
    },
    { matches: 0, diffs: 0, count: 0 },
  );
  return [
    {
      label: 'Übereinstimmungen',
      percent: pieData.matches / pieData.count,
      value: pieData.matches,
      total: pieData.count,
      color: '#f5a623',
    },
    {
      label: 'Differenzen',
      percent: pieData.diffs / pieData.count,
      value: pieData.diffs,
      total: pieData.count,
      color: '#b1b3b4',
    },
  ];
};

const Wahlkreis = ({ onProcedureListItemClick, navigator }) => {
  return (
    <VotedProceduresWrapper
      onProcedureListItemClick={onProcedureListItemClick}
      navigator={navigator}
    >
      {({ totalProcedures, chartData, deputy: { imgURL, party, constituency, name } }) => {
        const WIDTH = 300;
        const matchingProcedures = getMatchingProcedures(chartData);
        let preparedData = pieChartData({ ...chartData, matchingProcedures });

        // Prepare Data
        let preValues = 0;
        let rowValues = preparedData.map(rowChartData => {
          const width = (rowChartData.value / rowChartData.total) * 100 + preValues;
          preValues = width;
          return {
            ...rowChartData,
            value: width,
          };
        });
        rowValues = [...rowValues].reverse();

        const getPercentagePosition = (WIDTH / 100) * rowValues[1].value;

        if (matchingProcedures.length > 0) {
          return (
            <Wrapper>
              <Header
                totalProcedures={totalProcedures}
                votedProceduresCount={matchingProcedures.length}
              />
              <ChartWrapper>
                <MemberImageWrapper>
                  <MemberImage source={{ uri: imgURL }} />
                  <Party party={party} />
                </MemberImageWrapper>
                <DeputyDetailsWrapper>
                  <NameWrapper>
                    <Text>{name}</Text>
                    <TextLighGrey>Direktkadidat WK {constituency}</TextLighGrey>
                  </NameWrapper>
                  <InfoIconButton
                    onPress={() =>
                      navigator.push({
                        screen: 'democracy.MemberProfil',
                        title: `Abgeordnetenprofil`,
                        backButtonTitle: '',
                        passProps: {
                          noMenu: true,
                        },
                      })
                    }
                  >
                    <InfoIcon />
                  </InfoIconButton>
                </DeputyDetailsWrapper>
                <Svg
                  viewBox={`0 0 ${WIDTH} 37`}
                  style={{ width: '100%', height: 37, marginTop: 8 }}
                  preserveAspectRatio={false}
                >
                  <G x="0" y="8" width={WIDTH} height="20">
                    {rowValues.map(({ label, value, color }) => {
                      return (
                        <Rect
                          key={label}
                          x="0"
                          y="0"
                          width={(WIDTH / 100) * value}
                          rx="3"
                          ry="3"
                          height="20"
                          fill={color}
                        />
                      );
                    })}
                    {
                      <SvgText
                        fill="#4a4a4a"
                        fontSize="12"
                        x={
                          rowValues[1].value > 18
                            ? getPercentagePosition - 5
                            : getPercentagePosition + 5
                        }
                        y="15"
                        textAnchor={rowValues[1].value > 18 ? 'end' : 'start'}
                      >
                        {`${parseFloat(rowValues[1].value)
                          .toFixed(1)
                          .replace('.', ',')}%`}
                      </SvgText>
                    }
                  </G>
                </Svg>
              </ChartWrapper>
              <ChartLegend data={preparedData} />
              <ChartNote>
                Hohe Übereinstimmungen Ihrer Stellungnahmen mit Ihrem Direktkandidaten bedeuten eine
                inhaltliche Nähe zu diesem Abgeordneten
              </ChartNote>
              <ListSectionHeader title="Abstimmungen" />
            </Wrapper>
          );
        }
        return (
          <>
            <NoVotesPlaceholder subline="Wahlkreis" />
            <ListSectionHeader title="Abstimmungen" />
          </>
        );
      }}
    </VotedProceduresWrapper>
  );
};

Wahlkreis.propTypes = {
  navigator: PropTypes.instanceOf(Navigator).isRequired,
  onProcedureListItemClick: PropTypes.func.isRequired,
};

export default Wahlkreis;
