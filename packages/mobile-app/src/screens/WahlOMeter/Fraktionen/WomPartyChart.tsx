import React, { useContext, useState } from 'react';
import { Dimensions } from 'react-native';
import Header from '../Header';
import ChartNote from '../ChartNote';
import PartyChart from '../../Bundestag/Procedure/components/GovernmentVoteResults/PartyChart/Component';
import { styled } from '../../../styles';
import {
  PartyChartData,
  PartyChartDataVariables,
} from '../../Bundestag/Procedure/Voting/components/graphql/query/__generated__/PartyChartData';
import { useQuery } from '@apollo/client';
import { PARTY_CHART_DATA } from '../../Bundestag/Procedure/Voting/components/graphql/query/proceduresByIdHavingVoteResults';
import { LocalVotesContext } from '../../../context/LocalVotes';
import { ListLoading } from '@democracy-deutschland/mobile-ui/src/components/shared/ListLoading';
import { ChartData } from '../Bundestag/VotedProceduresWrapper';
import { Segment } from '../../Bundestag/List/Components/Segment';
import { WomPartyContext } from './context';
import ChartLegend from '../../Bundestag/Procedure/components/Charts/ChartLegend';

const Wrapper = styled.View`
  padding-top: 18px;
`;

const ChartWrapper = styled.View`
  padding-horizontal: 18px;
  padding-top: 18px;
  align-self: center;
  width: 100%;
  max-width: ${() =>
    Math.min(Dimensions.get('window').width, Dimensions.get('window').height)};
`;

// interface Props {}

export const WomPartyChart: React.FC = () => {
  const { localVotes } = useContext(LocalVotesContext);
  const [selectedPartyIndex, setSelectedPartyIndex] = useState(0);
  const { setWomParty, party: womParty } = useContext(WomPartyContext);
  const { data: proceduresData } = useQuery<
    PartyChartData,
    PartyChartDataVariables
  >(PARTY_CHART_DATA, {
    variables: {
      procedureIds: localVotes.map(({ procedureId }) => procedureId),
      pageSize: 999999,
    },
  });

  let totalProcedures = 0;
  if (proceduresData && proceduresData.partyChartProcedures) {
    totalProcedures = proceduresData.partyChartProcedures.total || 0;
  }
  if (!proceduresData) {
    return <ListLoading />;
  }

  // Filtered Array of procedures voted local
  const getMatchingProcedures = ({ votedProcedures }: ChartData) =>
    votedProcedures.partyChartProcedures.procedures.filter(({ procedureId }) =>
      localVotes.find(({ procedureId: pid }) => pid === procedureId),
    );

  const matchingProcedures = getMatchingProcedures({
    votedProcedures: proceduresData,
    localVotes,
  });

  const partyChartData = () => {
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

  const prepareCharLegendData = (
    preparedData: {
      party: string;
      values: {
        label: string;
        value: number;
        color: string;
      }[];
    }[],
  ) => {
    return [
      {
        label: 'Übereinstimmungen',
        value: preparedData[selectedPartyIndex].values[0].value,
        color: '#f5a623',
      },
      {
        label: 'Differenzen',
        value: preparedData[selectedPartyIndex].values[1].value,
        color: '#b1b3b4',
      },
    ];
  };

  const preparedData = partyChartData();
  if (!preparedData[selectedPartyIndex]) {
    return null;
  }
  if (!womParty) {
    setWomParty(preparedData[selectedPartyIndex].party);
  }

  const onClick = (index: number) => () => {
    setSelectedPartyIndex(index);
    setWomParty(preparedData[index].party);
  };

  return (
    <Wrapper>
      <Header
        totalProcedures={totalProcedures}
        votedProceduresCount={matchingProcedures.length}
      />
      <ChartWrapper>
        <PartyChart
          width={Dimensions.get('window').width}
          chartData={preparedData}
          onClick={onClick}
          selected={selectedPartyIndex}
          showPercentage
          colors={['#b1b3b4', '#f5a623']}
        />
        <ChartLegend data={prepareCharLegendData(preparedData)} />
        <ChartNote>
          Hohe Übereinstimmungen Ihrer Stellungnahmen mit mehreren Parteien
          bedeuten nicht zwangsläufig eine inhaltliche Nähe dieser Parteien
          zueinander
        </ChartNote>
      </ChartWrapper>

      <Segment text="Abstimmungen" />
    </Wrapper>
  );
};
