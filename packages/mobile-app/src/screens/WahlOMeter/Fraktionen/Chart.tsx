import React, { PureComponent } from 'react';
import styled from 'styled-components/native';
import { Dimensions } from 'react-native';

// Components

import Header from '../Header';
import ChartNote from '../ChartNote';
import NoVotesPlaceholder from '../NoVotesPlaceholder';
import PartyChart from '../../Bundestag/Procedure/components/GovernmentVoteResults/PartyChart/Component';
import ChartLegend from '../../Bundestag/Procedure/components/Charts/ChartLegend';
import { Segment } from '../../Bundestag/List/Components/Segment';
import { WahlOMeterScreenNavigationProp } from '..';
import { proceduresByIdHavingVoteResults_proceduresByIdHavingVoteResults_procedures } from '../../Bundestag/Procedure/Voting/components/graphql/query/__generated__/proceduresByIdHavingVoteResults';

const Wrapper = styled.View`
  padding-top: 18;
`;

const ChartWrapper = styled.View`
  padding-horizontal: 18;
  padding-top: 18;
  align-self: center;
  width: 100%;
  max-width: ${() =>
    Math.min(Dimensions.get('window').width, Dimensions.get('window').height)};
`;

interface Props {
  navigation: WahlOMeterScreenNavigationProp;
  totalProcedures: number;
  changeSelectedParty: (party: string) => void;
  matchingProcedures: proceduresByIdHavingVoteResults_proceduresByIdHavingVoteResults_procedures[];
  preparedData: {
    party: string;
    values: {
      label: string;
      value: number;
      color: string;
    }[];
  }[];
}

class FraktionenChart extends PureComponent<Props> {
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

  onClick = (index: number, party: string) => () => {
    this.setState({ selected: index }, () => {
      this.props.changeSelectedParty(party);
    });
  };

  prepareCharLegendData = (
    preparedData: {
      party: string;
      values: {
        label: string;
        value: number;
        color: string;
      }[];
    }[],
  ) => {
    const { selected } = this.state;
    return [
      {
        label: 'Übereinstimmungen',
        value: preparedData[selected].values[0].value,
        color: '#f5a623',
      },
      {
        label: 'Differenzen',
        value: preparedData[selected].values[1].value,
        color: '#b1b3b4',
      },
    ];
  };

  render() {
    const { chartWidth, selected } = this.state;
    const { matchingProcedures, totalProcedures, preparedData } = this.props;

    if (matchingProcedures.length > 0) {
      return (
        <Wrapper>
          <Header
            totalProcedures={totalProcedures}
            votedProceduresCount={matchingProcedures.length}
          />
          <ChartWrapper>
            <PartyChart
              width={chartWidth}
              chartData={preparedData}
              onClick={index => this.onClick(index, preparedData[index].party)}
              selected={selected}
              showPercentage
              colors={['#b1b3b4', '#f5a623']}
            />
            <ChartLegend data={this.prepareCharLegendData(preparedData)} />
            <ChartNote>
              Hohe Übereinstimmungen Ihrer Stellungnahmen mit mehreren Parteien
              bedeuten nicht zwangsläufig eine inhaltliche Nähe dieser Parteien
              zueinander
            </ChartNote>
          </ChartWrapper>

          <Segment text="Abstimmungen" />
        </Wrapper>
      );
    }
    return (
      <>
        <NoVotesPlaceholder subline="Fraktionen" />
        <Segment text="Abstimmungen" />
      </>
    );
  }
}

export default FraktionenChart;
