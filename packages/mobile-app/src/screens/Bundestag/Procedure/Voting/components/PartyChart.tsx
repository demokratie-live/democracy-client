import React, { PureComponent } from 'react';
import { Dimensions } from 'react-native';

// Components
import ChartLegend from '../../components/Charts/ChartLegend';
// GraphQL
// import VOTES_SELECTION_LOCAL from '../../graphql/queries/local/votesSelection';
// import PROCEDURES_WITH_VOTE_RESULTS from '../../graphql/queries/proceduresByIdHavingVoteResults';
// import NoConstituency from './NoConstituency';
import PartyChart, {
  PartyChartChartData,
} from '../../components/GovernmentVoteResults/PartyChart/Component';
// import { SegmentedData } from '../../../List';
import { PartyChartData } from './graphql/query/__generated__/PartyChartData';
import { PartyChartRowValues } from '../../components/GovernmentVoteResults/PartyChart/PartyRow';
import { styled } from '../../../../../styles';

const Wrapper = styled.View`
  align-items: center;
`;

const Text = styled.Text`
  padding-bottom: 18px;
  color: ${({ theme }) => theme.textColors.secondary};
  font-size: 14px;
  text-align: center;
`;

interface LocalVoteItemData {
  procedureId: string;
  selection: string;
}

interface LocalVoteData {
  votesSelectionLocal: LocalVoteItemData[];
}

interface PartyVotesData {
  [party: string]: {
    matches: number;
    diffs: number;
  };
}

interface Props {
  chartWidth?: number;
  selected?: boolean;
}

class Fraktionen extends PureComponent<Props> {
  state = {
    chartWidth: Math.min(
      Dimensions.get('screen').width,
      Dimensions.get('screen').height,
    ),
    selected: 0,
  };
  onLayout = () => {
    const chartWidth = Math.min(
      Dimensions.get('screen').width,
      Dimensions.get('screen').height,
    );
    if (this.state.chartWidth !== chartWidth) {
      this.setState({
        chartWidth,
      });
    }
  };

  onClick = (index: number) => () => {
    this.setState({ selected: index });
  };

  partyChartData = ({
    votedProcedures,
    data,
  }: {
    votedProcedures: PartyChartData;
    data: LocalVoteData;
  }): PartyChartChartData[] => {
    const chartData = votedProcedures.partyChartProcedures.procedures.reduce<
      PartyVotesData
    >((prev, { voteResults, procedureId }) => {
      if (!voteResults || !procedureId) {
        return prev;
      }
      const { partyVotes } = voteResults;

      const meData = data.votesSelectionLocal.find(
        ({ procedureId: pid }) => pid === procedureId,
      );

      const me = meData ? meData.selection : '';

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

  render() {
    const { chartWidth, selected } = this.state;

    const votedProcedures: PartyChartData = {
      partyChartProcedures: {
        procedures: [],
        total: 0,
        __typename: 'ProceduresHavingVoteResults',
      },
    };
    const data: LocalVoteData = {
      votesSelectionLocal: [],
    };

    // TODO if loading
    // return <ActivityIndicator size="large" />;

    // TODO if empty local votes
    // return <NoConstituency noButton navigator={navigator} />;

    const chartData: PartyChartChartData[] = this.partyChartData({
      votedProcedures,
      data,
    });

    const chartLegendData: PartyChartRowValues[] = [
      {
        label: 'Übereinstimmungen',
        value: chartData[selected].values[0].value,
        color: '#f5a623',
      },
      {
        label: 'Differenzen',
        value: chartData[selected].values[1].value,
        color: '#b1b3b4',
      },
    ];

    // CHART
    return (
      <Wrapper>
        <Text>Deine derzeitige Übereinstimmung mit den Fraktionen</Text>
        <PartyChart
          width={chartWidth + 36}
          chartData={chartData}
          onClick={this.onClick}
          selected={selected}
          showPercentage
          colors={['#f5a623', '#b1b3b4']}
        />
        <ChartLegend data={chartLegendData} />
      </Wrapper>
    );
  }
}

export default Fraktionen;
