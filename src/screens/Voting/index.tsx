import React, { useState } from 'react';
import { Platform, ActivityIndicator, LayoutChangeEvent } from 'react-native';
import BallotBox from './components/BallotBox';
import { NoConstituency } from './components/NoConstituency';
import Fade from './components/Animations/Fade';
import { RouteProp } from '@react-navigation/core';
import ChartLegend from '../Procedure/components/Charts/ChartLegend';
import styled from 'styled-components/native';
import { RootStackParamList } from '../../routes';
import { useRecoilValue } from 'recoil';
import { parlaments, parlamentState } from '../../api/state/parlament';
import { constituencyState } from '../../api/state/constituency';
import { LocalVote, localVotesState } from '../../api/state/votesLocal';
import { PartyChartDataQuery, usePartyChartDataQuery } from '../../__generated__/graphql';
import { BarChart, ChartLegendData, WomPartyChartData } from '@democracy-deutschland/ui';
import { theme } from '../../styles/theme';
import { Centered } from '../../components/Centered';
import { NoVotesPlaceholder } from '../../components/NoVotesPlaceholder';

const Wrapper = styled.View`
  flex: 1;
  background-color: #fff;
`;

const ScrollWrapper = styled.ScrollView.attrs({
  contentContainerStyle: {
    flexGrow: 1,
    paddingBottom: Platform.OS === 'android' ? 73 : 18,
    alignItems: 'center',
  },
})`
  flex-grow: 1;
`;

const Title = styled.Text`
  padding-top: 9px;
  padding-horizontal: 18px;
  font-size: 34px;
  padding-bottom: 9px;
`;

const WarnWrapper = styled.View`
  position: absolute;
  left: 0px;
  right: 0px;
  bottom: 130px;
  background-color: rgba(0, 0, 0, 0);
`;

const WarnTextWrapper = styled.View`
  align-items: center;
  justify-content: center;
  padding-vertical: 11px;
  padding-horizontal: 11px;
  background-color: rgb(255, 255, 255);
  opacity: 0.9;
`;

const WarnText = styled.Text`
  text-align: center;
  color: rgb(0, 0, 0);
  font-size: 13px;
`;

const BalloutBoxWrapper = styled.View`
  height: 130px;
  background-color: rgba(250, 250, 250, 0.9);
  border-top-width: 1px;
  border-top-color: rgba(68, 148, 211, 0.1);
`;

const Description = styled.Text`
  color: ${({ theme }) => theme.colors.text.tertiary};
  padding-horizontal: 18px;
  margin-bottom: 18px;
  text-align: center;
`;

type VoteVerificationScreenRouteProp = RouteProp<RootStackParamList, 'Voting'>;

interface Props {
  route: VoteVerificationScreenRouteProp;
}

export const VotingScreen: React.FC<Props> = ({ route }) => {
  const parlamentIdentifier = useRecoilValue(parlamentState);
  const parlament = parlaments[parlamentIdentifier];
  const [showWarning, setShowWarning] = useState(true);
  const [selectedParty, setSelectedParty] = useState(0);
  const constituency = useRecoilValue(constituencyState);
  const localVotes = useRecoilValue(localVotesState);
  const { data: proceduresData } = usePartyChartDataQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      procedureIds: localVotes.map(({ procedureId }) => procedureId),
      pageSize: 999999,
      period: parlament.period,
    },
  });
  const [chartWidth, setChartDimensions] = useState(0);

  const onLayout = (event: LayoutChangeEvent) => {
    const { width: newWidth } = event.nativeEvent.layout;
    setChartDimensions(newWidth);
  };

  const onScroll = () => {
    if (showWarning) {
      setShowWarning(false);
    }
  };

  const { selection, procedureId, procedureObjId, title } = route.params;

  const getMatchingProcedures = ({
    votedProcedures,
  }: {
    votedProcedures: PartyChartDataQuery;
    localVotes: LocalVote[];
  }) =>
    votedProcedures.partyChartProcedures.procedures.filter(({ procedureId: itemProcedureId }) =>
      localVotes.find(({ procedureId: pid }) => pid === itemProcedureId),
    );

  const partyChartData = ({
    matchingProcedures,
  }: {
    matchingProcedures: PartyChartDataQuery['partyChartProcedures']['procedures'];
    votedProcedures: PartyChartDataQuery;
    localVotes: LocalVote[];
  }): WomPartyChartData[] => {
    const chartData = matchingProcedures.reduce<{
      [party: string]: { diffs: number; matches: number };
    }>((prev, { voteResults, procedureId: itemProcedureId }) => {
      if (!voteResults) {
        return prev;
      }
      const { partyVotes } = voteResults;
      const userVote = localVotes.find(({ procedureId: pid }) => pid === itemProcedureId);
      const me = userVote ? userVote.selection : undefined;
      partyVotes.forEach(({ party, main }) => {
        if (party === 'fraktionslos') {
          return prev;
        }
        let matched = false;
        if (me === main) {
          matched = true;
        }

        if (prev[party] && matched) {
          prev = {
            ...prev,
            [party]: {
              ...prev[party],
              matches: prev[party].matches + 1,
            },
          };
        } else if (prev[party] && !matched) {
          prev = {
            ...prev,
            [party]: {
              ...prev[party],
              diffs: prev[party].diffs + 1,
            },
          };
        } else if (!prev[party] && matched) {
          prev = {
            ...prev,
            [party]: {
              diffs: 0,
              matches: 1,
            },
          };
        } else if (!prev[party] && !matched) {
          prev = {
            ...prev,
            [party]: {
              matches: 0,
              diffs: 1,
            },
          };
        }
      });
      return prev;
    }, {});
    return Object.keys(chartData)
      .map<WomPartyChartData>(key => ({
        party: key,
        deviants: [
          {
            label: 'Übereinstimmungen',
            value: chartData[key].matches,
            color: '#f5a623',
          },
          {
            label: 'Differenzen',
            value: chartData[key].diffs,
            color: '#b1b3b4',
          },
        ],
      }))
      .sort((a, b) => b.deviants[0].value - a.deviants[0].value);
  };

  let preparedData: WomPartyChartData[] | null = null;

  if (proceduresData) {
    const chartData = {
      votedProcedures: proceduresData,
      localVotes,
    };

    const matchingProcedures = getMatchingProcedures(chartData);

    preparedData = partyChartData({
      ...chartData,
      matchingProcedures,
    });
  }

  const prepareCharLegendData = (data: ReturnType<typeof partyChartData>): ChartLegendData[] => {
    return [
      {
        label: 'Übereinstimmungen',
        color: theme.colors.vote.wom.match,
        value: data[selectedParty].deviants[0].value,
      },
      {
        label: 'Differenzen',
        color: theme.colors.vote.wom.missmatch,
        value: data[selectedParty].deviants[1].value,
      },
    ];
  };

  let Content = (
    <Centered>
      <ActivityIndicator size="large" />
    </Centered>
  );
  if (!constituency) {
    Content = <NoConstituency />;
  }

  if (constituency && preparedData && !preparedData.length) {
    Content = <NoVotesPlaceholder subline="Fraktionen" />;
  } else if (constituency && preparedData && preparedData.length) {
    Content = (
      <>
        <Description>Deine derzeitige Übereinstimmung mit den Fraktionen</Description>
        <BarChart
          width={chartWidth}
          height={chartWidth}
          data={preparedData}
          setSelectedParty={setSelectedParty}
          selectedParty={selectedParty}
        />
        <ChartLegend data={prepareCharLegendData(preparedData)} />
      </>
    );
  }
  return (
    <Wrapper {...{ onLayout }}>
      <ScrollWrapper onScroll={onScroll} scrollEventThrottle={1000}>
        <Title>Schon gewusst?</Title>
        {Content}
      </ScrollWrapper>
      <WarnWrapper pointerEvents="none">
        <Fade visible={showWarning}>
          <WarnTextWrapper>
            <WarnText>Deine Stimme ist verbindlich und kann nicht zurückgenommen werden</WarnText>
          </WarnTextWrapper>
        </Fade>
      </WarnWrapper>
      <BalloutBoxWrapper>
        <BallotBox
          selection={selection}
          procedureId={procedureId}
          procedureObjId={procedureObjId}
          title={title}
        />
      </BalloutBoxWrapper>
    </Wrapper>
  );
};
