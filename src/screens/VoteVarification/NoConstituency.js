import React from 'react';
import styled from 'styled-components/native';

// components
import Constituency from './Constituency';
import PieChart from '../../components/Charts/PieChart';
import Button from '../../components/Button';

const Wrapper = styled.View`
  height: 100%
  align-items: center;
  justify-content: space-around;
`;

const ImageWrapper = styled.View``;

const PieChartWrapper = styled.View`
  position: absolute;
  right: 18;
  bottom: 0;
`;

const Text = styled.Text`
  font-size: 13;
  color: #9b9b9b;
  text-align: center;
`;
const TextBold = styled.Text`
  color: #000;
`;

const VoteVarificationNoConstituency = ({ navigator }) => {
  const randomMainValue = Math.random() * (1 - 0.7);
  const randomSecondValue = Math.min(...[Math.random() * (1 - randomMainValue), 0.2]);

  const pieChartData = [
    { percent: randomMainValue, color: '#59BC6D' },
    { percent: randomSecondValue, color: '#4183DD' },
    { percent: 1 - randomMainValue - randomSecondValue, color: '#DB4D3C' },
  ];

  const navigateToSelectConstituency = () =>
    navigator.push({
      screen: 'democracy.Profil.Constituency',
      title: 'Wahlkreissuche',
      backButtonTitle: '',
    });

  return (
    <Wrapper>
      <ImageWrapper>
        <Constituency width={249} height={155} />
        <PieChartWrapper>
          <PieChart data={pieChartData} width={100} showPercentage={false} />
        </PieChartWrapper>
      </ImageWrapper>
      <Text>
        Ab sofort können mit DEMOCRACY auch <TextBold>Wahlkreis-Community-Ergebnisse</TextBold>{' '}
        ermittelt werden. Mach Mit uns inspiriere Deinen Abgeordneten noch direkter
      </Text>
      <Button title={`Wahlkreis einstellen`.toUpperCase()} onPress={navigateToSelectConstituency} />
    </Wrapper>
  );
};

export default VoteVarificationNoConstituency;
