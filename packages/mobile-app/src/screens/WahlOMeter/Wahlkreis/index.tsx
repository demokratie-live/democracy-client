import React, { PureComponent } from 'react';
import styled from 'styled-components/native';
import { Platform, Alert } from 'react-native';
import Svg, { Rect, Text as SvgText, G } from 'react-native-svg';

// Components
import Header from '../Header';
import ChartNote from '../ChartNote';
import VotedProceduresWrapper, { ChartData } from './VotedProceduresWrapper';
import NoVotesPlaceholder from '../NoVotesPlaceholder';
import PartyComponent from '../../Bundestag/Procedure/components/GovernmentVoteResults/Parties';
import ChartLegend from '../../Bundestag/Procedure/components/Charts/ChartLegend';
import { Segment } from '../../Bundestag/List/Components/Segment';
import { ChainEntry } from '../../../lib/VotesLocal';
import { VoteSelection } from '../../../../__generated__/globalTypes';

const Wrapper = styled.View`
  padding-top: 18;
`;

const MemberImageWrapper = styled.TouchableOpacity`
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

const InfoIconButton = styled.TouchableOpacity``;

const InfoIcon = styled.Text``;

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
const getMatchingProcedures = ({ votedProcedures, localVotes }: ChartData) =>
  votedProcedures.filter(({ procedureId }) =>
    localVotes.find(({ procedureId: pid }) => pid === procedureId),
  );

const pieChartData = ({
  localVotes,
  matchingProcedures,
}: {
  localVotes: ChainEntry[];
  matchingProcedures: {
    procedureId: string;
    decision: VoteSelection;
  }[];
}) => {
  // Pie Chart Data Preparation
  const pieDataRaw = matchingProcedures.map(({ decision, procedureId }) => {
    const userVote = localVotes.find(
      ({ procedureId: pid }) => pid === procedureId,
    );
    return {
      deputy: decision,
      me: userVote ? userVote.selection : undefined,
    };
  });
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

class Wahlkreis extends PureComponent {
  render() {
    return (
      <VotedProceduresWrapper
        onProcedureListItemClick={() => Alert.alert('navigate to procedure')}>
        {({
          totalProcedures,
          chartData,
          deputy: { imgURL, party, constituency, name },
        }) => {
          const WIDTH = 300;
          const matchingProcedures = getMatchingProcedures(chartData);
          const preparedData = pieChartData({
            ...chartData,
            matchingProcedures,
          });

          // Prepare Data
          let preValues = 0;
          let rowValues = preparedData.map(rowChartData => {
            const width =
              (rowChartData.value / rowChartData.total) * 100 + preValues;
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
                  <MemberImageWrapper
                    onPress={
                      () => Alert.alert('Navigate to abgeordnetenprofil')
                      // navigator.push({
                      //   screen: 'democracy.MemberProfil',
                      //   title: `Abgeordnetenprofil`,
                      //   backButtonTitle: '',
                      //   passProps: {
                      //     noMenu: true,
                      //   },
                      // })
                    }>
                    <MemberImage source={{ uri: imgURL }} />
                    <Party party={party} />
                  </MemberImageWrapper>
                  <DeputyDetailsWrapper>
                    <NameWrapper>
                      <Text>{name}</Text>
                      <TextLighGrey>
                        Direktkandidat WK {constituency}
                      </TextLighGrey>
                    </NameWrapper>
                    <InfoIconButton
                      onPress={
                        () => () =>
                          Alert.alert('Navigate to abgeordnetenprofil')
                        // navigator.push({
                        //   screen: 'democracy.MemberProfil',
                        //   title: `Abgeordnetenprofil`,
                        //   backButtonTitle: '',
                        //   passProps: {
                        //     noMenu: true,
                        //   },
                        // })
                      }>
                      <InfoIcon>Info</InfoIcon>
                    </InfoIconButton>
                  </DeputyDetailsWrapper>
                  <Svg
                    viewBox={`0 0 ${WIDTH} 37`}
                    style={{ width: '100%', height: 37, marginTop: 8 }}
                    preserveAspectRatio={'false'}>
                    <G x="0" y="8">
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
                          textAnchor={
                            rowValues[1].value > 18 ? 'end' : 'start'
                          }>
                          {`${rowValues[1].value
                            .toFixed(1)
                            .replace('.', ',')}%`}
                        </SvgText>
                      }
                    </G>
                  </Svg>
                </ChartWrapper>
                <ChartLegend data={preparedData} />
                <ChartNote>
                  Hohe Übereinstimmungen Ihrer Stellungnahmen mit Ihrem
                  Direktkandidaten bedeuten eine inhaltliche Nähe zu diesem
                  Abgeordneten
                </ChartNote>
                <Segment text="Abstimmungen" />
              </Wrapper>
            );
          }
          return (
            <>
              <NoVotesPlaceholder subline="Wahlkreis" />
              <Segment text="Abstimmungen" />
            </>
          );
        }}
      </VotedProceduresWrapper>
    );
  }
}

export default Wahlkreis;
