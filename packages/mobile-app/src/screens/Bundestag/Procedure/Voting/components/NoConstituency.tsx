import React, { PureComponent } from 'react';

// components
import Constituency from './Constituency';
import PieChart from '../../components/Charts/PieChart';
import { RootStackParamList } from '../../../../../routes';
import { StackNavigationProp } from '@react-navigation/stack';
import { ButtonNext, Space } from '../../../../modals/Verification/Start';
import { styled } from '../../../../../styles';

const Wrapper = styled.View<Pick<Props, 'noButton'>>`
  align-items: center;
  /* justify-content: space-around; */
  min-height: ${({ noButton }) => (noButton ? 200 : 300)};
  /* flex: 1; */
`;

const ImageWrapper = styled.View``;

const PieChartWrapper = styled.View`
  position: absolute;
  right: 18;
  bottom: 0;
  width: 100;
`;

const Text = styled.Text`
  font-size: 13;
  color: ${({ theme }) => theme.textColors.secondary};
  text-align: center;
  padding-horizontal: 18;
`;

const TextBold = styled.Text`
  color: #000;
`;

type ScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Sidebar'>;

interface Props {
  noButton?: boolean;
  navigation: ScreenNavigationProp;
}

class VoteVarificationNoConstituency extends PureComponent<Props> {
  render() {
    const { noButton } = this.props;
    const randomMainValue = Math.random() * (1 - 0.7);
    const randomSecondValue = Math.min(
      ...[Math.random() * (1 - randomMainValue), 0.2],
    );

    const pieChartData = [
      { percent: randomMainValue, color: '#59BC6D', label: 'Zustimmungen' },
      { percent: randomSecondValue, color: '#4183DD', label: 'Enthaltungen' },
      {
        percent: 1 - randomMainValue - randomSecondValue,
        color: '#DB4D3C',
        label: 'Ablehnungen',
      },
    ];

    const navigateToSelectConstituency = () => {
      this.props.navigation.navigate('Constituency', {
        goBack: true,
      });
    };

    return (
      <Wrapper noButton={noButton}>
        <Space />
        <ImageWrapper>
          <Constituency width={249} height={155} />
          <PieChartWrapper>
            <PieChart data={pieChartData} showPercentage={false} />
          </PieChartWrapper>
        </ImageWrapper>
        <Space />
        <Text>
          Ab sofort können mit DEMOCRACY auch{' '}
          <TextBold>Wahlkreis-Community-Ergebnisse</TextBold> ermittelt werden.
          Mach mit und inspiriere Deinen Abgeordneten noch direkter!
        </Text>
        <Space />
        {!noButton && (
          <ButtonNext
            style={{ alignSelf: 'stretch' }}
            text={'Wahlkreis einstellen'.toUpperCase()}
            textColor="white"
            backgroundColor="blue"
            onPress={navigateToSelectConstituency}
          />
        )}
      </Wrapper>
    );
  }
}

export default VoteVarificationNoConstituency;
