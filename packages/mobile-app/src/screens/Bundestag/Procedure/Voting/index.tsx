import React, { useContext, useState } from 'react';
import styled from 'styled-components/native';
import { Platform, Dimensions } from 'react-native';

import BallotBox from './components/BallotBox';

// Components
import NoConstituency from './components/NoConstituency';
// import PartyChart from './components/PartyChart';

// GraphQL
import { PROCEDURES_BY_HAVING_VOTE_RESULTS } from './components/graphql/query/proceduresByIdHavingVoteResults';
import Fade from './components/Animations/Fade';
import { BundestagRootStackParamList } from '../../../../routes/Sidebar/Bundestag';
import { RouteProp } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import { ConstituencyContext } from '../../../../context/Constituency';
import PartyChart from '../components/GovernmentVoteResults/PartyChart/Component';
import {
  proceduresByIdHavingVoteResults_proceduresByIdHavingVoteResults_procedures,
  proceduresByIdHavingVoteResults,
  proceduresByIdHavingVoteResultsVariables,
} from './components/graphql/query/__generated__/proceduresByIdHavingVoteResults';
import { ChainEntry } from '../../../../lib/VotesLocal';
import { LocalVotesContext } from '../../../../context/LocalVotes';
import { useQuery } from '@apollo/react-hooks';
import ChartLegend from '../components/Charts/ChartLegend';
import NoVotesPlaceholder from '../../../WahlOMeter/NoVotesPlaceholder';
import { ChartData } from '../../../WahlOMeter/Fraktionen/FraktionenList';

const Wrapper = styled.View`
  flex: 1;
  background-color: #fff;
`;

const ScrollWrapper = styled.ScrollView.attrs({
  contentContainerStyle: {
    flexGrow: 1,
    paddingBottom: Platform.OS === 'android' ? 73 : 18,
  },
})`
  flex-grow: 1;
`;

const Title = styled.Text`
  padding-top: 9;
  padding-horizontal: 18;
  font-size: 34;
  padding-bottom: 9;
`;

const WarnWrapper = styled.View`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 130;
  background-color: rgba(0, 0, 0, 0);
`;

const WarnTextWrapper = styled.View`
  align-items: center;
  justify-content: center;
  padding-vertical: 11;
  background-color: rgb(255, 255, 255);
  opacity: 0.9;
`;

const WarnText = styled.Text`
  text-align: center;
  color: rgb(0, 0, 0);
  font-size: 13;
`;

const BalloutBoxWrapper = styled.View`
  height: 130;
  background-color: rgba(250, 250, 250, 0.9);
  border-top-width: 1;
  border-top-color: rgba(68, 148, 211, 0.1);
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
  const [chartWidth] = useState(
    Math.min(Dimensions.get('screen').width, Dimensions.get('screen').height),
  );
  const [showWarning, setShowWarning] = useState(true);
  const [selected, setSelected] = useState(0);
  const { constituency } = useContext(ConstituencyContext);
  const { localVotes } = useContext(LocalVotesContext);
  const { data: proceduresData } = useQuery<
    proceduresByIdHavingVoteResults,
    proceduresByIdHavingVoteResultsVariables
  >(PROCEDURES_BY_HAVING_VOTE_RESULTS, {
    fetchPolicy: 'cache-and-network',
    variables: {
      procedureIds: localVotes.map(({ procedureId }) => procedureId),
      pageSize: 999999,
    },
  });

  const onScroll = () => {
    if (showWarning) {
      setShowWarning(false);
    }
  };

  const { selection, procedureId, procedureObjId } = route.params;

  const getMatchingProcedures = ({ votedProcedures }: ChartData) =>
    votedProcedures.proceduresByIdHavingVoteResults.procedures.filter(
      ({ procedureId: itemProcedureId }) =>
        localVotes.find(({ procedureId: pid }) => pid === itemProcedureId),
    );

  const partyChartData = ({
    matchingProcedures,
  }: {
    matchingProcedures: proceduresByIdHavingVoteResults_proceduresByIdHavingVoteResults_procedures[];
    votedProcedures: proceduresByIdHavingVoteResults;
    localVotes: ChainEntry[];
  }) => {
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
      .map(key => ({
        party: key,
        values: [
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
      .sort((a, b) => b.values[0].value - a.values[0].value);
  };

  let preparedData: ReturnType<typeof partyChartData> | null = null;

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

  const prepareCharLegendData = (data: ReturnType<typeof partyChartData>) => {
    return [
      {
        label: 'Übereinstimmungen',
        value: data[selected].values[0].value,
        color: '#f5a623',
      },
      {
        label: 'Differenzen',
        value: data[selected].values[1].value,
        color: '#b1b3b4',
      },
    ];
  };

  const onClick = (index: number) => () => {
    setSelected(index);
  };

  return (
    <Wrapper>
      <ScrollWrapper onScroll={onScroll}>
        <Title>Schon gewusst?</Title>
        {!constituency && <NoConstituency navigation={navigation as any} />}
        {!!constituency && !!preparedData && !preparedData.length && (
          <NoVotesPlaceholder subline="Fraktionen" />
        )}
        {!!constituency && !!preparedData && !!preparedData.length && (
          <>
            <PartyChart
              width={chartWidth}
              chartData={preparedData}
              onClick={onClick}
              selected={selected}
              showPercentage
              colors={['#b1b3b4', '#f5a623']}
            />
            <ChartLegend data={prepareCharLegendData(preparedData)} />
          </>
        )}
        {
          // TODO add party chart here
        }
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
        />
      </BalloutBoxWrapper>
    </Wrapper>
  );
};
