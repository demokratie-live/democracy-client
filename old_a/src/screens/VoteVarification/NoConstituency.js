import React, { PureComponent } from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import { Navigator } from 'react-native-navigation';

// components
import Constituency from './Constituency';
import PieChart from '../../components/Charts/PieChart';
import Button from '../../components/Button';

const Wrapper = styled.View`
  align-items: center;
  justify-content: space-around;
  min-height: ${({ noButton }) => (noButton ? 200 : 300)};
  flex: 1;
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
  padding-horizontal: 18;
`;

const TextBold = styled.Text`
  color: #000;
`;

class VoteVarificationNoConstituency extends PureComponent {
  render() {
    const { navigator, noButton } = this.props;
    const randomMainValue = Math.random() * (1 - 0.7);
    const randomSecondValue = Math.min(...[Math.random() * (1 - randomMainValue), 0.2]);

    const pieChartData = [
      { percent: randomMainValue, color: '#59BC6D', label: 'Zustimmungen' },
      { percent: randomSecondValue, color: '#4183DD', label: 'Enthaltungen' },
      { percent: 1 - randomMainValue - randomSecondValue, color: '#DB4D3C', label: 'Ablehnungen' },
    ];

    const navigateToSelectConstituency = () =>
      navigator.push({
        screen: 'democracy.Profil.Constituency',
        title: 'Wahlkreissuche',
        backButtonTitle: '',
      });

    return (
      <Wrapper noButton={noButton}>
        <ImageWrapper>
          <Constituency width={249} height={155} />
          <PieChartWrapper width={100}>
            <PieChart data={pieChartData} width={100} showPercentage={false} />
          </PieChartWrapper>
        </ImageWrapper>
        <Text>
          Ab sofort können mit DEMOCRACY auch <TextBold>Wahlkreis-Community-Ergebnisse</TextBold>{' '}
          ermittelt werden. Mach mit und inspiriere Deinen Abgeordneten noch direkter!
        </Text>
        {!noButton && (
          <Button
            title={`Wahlkreis einstellen`.toUpperCase()}
            onPress={navigateToSelectConstituency}
          />
        )}
      </Wrapper>
    );
  }
}

VoteVarificationNoConstituency.propTypes = {
  navigator: PropTypes.instanceOf(Navigator).isRequired,
  noButton: PropTypes.bool,
};

VoteVarificationNoConstituency.defaultProps = {
  noButton: false,
};

export default VoteVarificationNoConstituency;
