import React, { PureComponent } from 'react';
import styled from 'styled-components/native';
import { Platform } from 'react-native';
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
import InfoIconComponent from '@democracy-deutschland/mobile-ui/src/components/Icons/Info';
import { ScreenNavigationProp } from '../../../routes/Sidebar/WahlOMeter/TabView';

const Wrapper = styled.View`
  padding-top: 18px;
`;

const MemberImageWrapper = styled.TouchableOpacity`
  width: 200px;
  height: 275px;
  align-items: center;
  padding-bottom: 8px;
`;

const MemberImage = styled.Image.attrs({
  resizeMode: 'contain',
})`
  flex: 1;
  height: 175px;
  width: 200px;
  border-radius: 100px;
  border-width: ${() => (Platform.OS === 'ios' ? 1 : 0)}px;
  border-color: lightgray;
`;

const Party = styled(PartyComponent)`
  position: absolute;
  right: 0px;
  bottom: 30px;
`;

const InfoIconButton = styled.TouchableOpacity``;

const InfoIcon = styled(InfoIconComponent).attrs(() => ({
  width: 18,
  height: 18,
  color: 'rgb(199, 199, 204)',
}))`
  margin-left: ${({ theme }) => theme.distances.small}px;
`;

const DeputyDetailsWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  position: relative;
  left: 20px;
`;

const NameWrapper = styled.View`
  align-items: center;
`;

const Text = styled.Text`
  font-size: 15px;
`;

const TextLighGrey = styled(Text)`
  color: ${({ theme }) => theme.textColors.secondary};
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

interface Props {
  navigation: ScreenNavigationProp;
}

class Wahlkreis extends PureComponent<Props> {
  render() {
    return (
      <VotedProceduresWrapper
        onProcedureListItemClick={({ item }) =>
          item !== 'chart'
            ? this.props.navigation.navigate('Procedure', {
                procedureId: item.procedureId,
                title: item.type || item.procedureId,
              })
            : null
        }>
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
                    onPress={() =>
                      this.props.navigation.navigate('MemberProfil')
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
                      onPress={() =>
                        this.props.navigation.navigate('MemberProfil')
                      }>
                      <InfoIcon />
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
