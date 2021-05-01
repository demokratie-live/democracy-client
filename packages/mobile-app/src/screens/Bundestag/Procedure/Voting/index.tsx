import React, { useContext, useState } from 'react';
import { Platform, ActivityIndicator, LayoutChangeEvent } from 'react-native';

import BallotBox from './components/BallotBox';

// Components
import NoConstituency from './components/NoConstituency';
// import PartyChart from './components/PartyChart';

// GraphQL
import { PARTY_CHART_DATA } from './components/graphql/query/proceduresByIdHavingVoteResults';
import Fade from './components/Animations/Fade';
import { BundestagRootStackParamList } from '../../../../routes/Sidebar/Bundestag';
import { RouteProp } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import { ConstituencyContext } from '../../../../context/Constituency';
import { ChartData } from '../../../WahlOMeter/Bundestag/VotedProceduresWrapper';
import {
  PartyChartData,
  PartyChartDataVariables,
  PartyChartData_partyChartProcedures_procedures,
} from './components/graphql/query/__generated__/PartyChartData';
import { ChainEntry } from '../../../../lib/VotesLocal';
import { LocalVotesContext } from '../../../../context/LocalVotes';
import { useQuery } from '@apollo/client';
import ChartLegend from '../components/Charts/ChartLegend';
import NoVotesPlaceholder from '../../../WahlOMeter/NoVotesPlaceholder';
import { styled, theme } from '../../../../styles';
import { Centered } from '@democracy-deutschland/mobile-ui/src/components/shared/Centered';
import {
  BarChart,
  ChartLegendData,
  WomPartyChartData,
} from '@democracy-deutschland/ui';

const Wrapper = styled.View`
  flex: 1;
  background-color: #fff;
  margin-horizontal: 18px;
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
  color: ${({ theme }) => theme.oldColors.description};
  padding-horizontal: 18px;
  margin-bottom: 18px;
`;

type VoteVerificationScreenNavigationProp = StackNavigationProp<
  BundestagRootStackParamList,
  'Voting'
>;

type VoteVerificationScreenRouteProp = RouteProp<
  BundestagRootStackParamList,
  'Voting'
>;

interface Props {
  route: VoteVerificationScreenRouteProp;
  navigation: VoteVerificationScreenNavigationProp;
}

export const VoteVerification: React.FC<Props> = ({ route, navigation }) => {
  const [showWarning, setShowWarning] = useState(true);
  const [selectedParty, setSelectedParty] = useState(0);
  const { constituency } = useContext(ConstituencyContext);
  const { localVotes } = useContext(LocalVotesContext);
  const { data: proceduresData } = useQuery<
    PartyChartData,
    PartyChartDataVariables
  >(PARTY_CHART_DATA, {
    fetchPolicy: 'cache-and-network',
    variables: {
      procedureIds: localVotes.map(({ procedureId }) => procedureId),
      pageSize: 999999,
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

  const getMatchingProcedures = ({ votedProcedures }: ChartData) =>
    votedProcedures.partyChartProcedures.procedures.filter(
      ({ procedureId: itemProcedureId }) =>
        localVotes.find(({ procedureId: pid }) => pid === itemProcedureId),
    );

  const partyChartData = ({
    matchingProcedures,
  }: {
    matchingProcedures: PartyChartData_partyChartProcedures_procedures[];
    votedProcedures: PartyChartData;
    localVotes: ChainEntry[];
  }): WomPartyChartData[] => {
    const chartData = matchingProcedures.reduce<{
      [party: string]: { diffs: number; matches: number };
    }>((prev, { voteResults, procedureId: itemProcedureId }) => {
      if (!voteResults) {
        return prev;
      }
      const { partyVotes } = voteResults;
      const userVote = localVotes.find(
        ({ procedureId: pid }) => pid === itemProcedureId,
      );
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

  const prepareCharLegendData = (
    data: ReturnType<typeof partyChartData>,
  ): ChartLegendData[] => {
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
    Content = <NoConstituency navigation={navigation as any} />;
  }

  if (constituency && preparedData && !preparedData.length) {
    Content = <NoVotesPlaceholder subline="Fraktionen" />;
  } else if (constituency && preparedData && preparedData.length) {
    Content = (
      <>
        <Description>
          Deine derzeitige Übereinstimmung mit den Fraktionen
        </Description>
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
            <WarnText>
              Deine Stimme ist verbindlich und kann nicht zurückgenommen werden
            </WarnText>
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
